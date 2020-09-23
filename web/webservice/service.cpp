/*
 * $Id: fcgi-test.cpp,v 1.5 2007/07/02 18:48:19 sebdiaz Exp $ 
 *
 *  Copyright (C) 1996 - 2004 Stephen F. Booth
 *                       2007 Sebastien DIAZ <sebastien.diaz@gmail.com>
 *  Part of the GNU cgicc library, http://www.gnu.org/software/cgicc
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 3 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110, USA 
 *
 */


#include <stdio.h>
#include <exception>
#include <iostream>
#include <fstream>
#include <sstream>

#include <unistd.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/file.h>
#include <dirent.h>

#include <signal.h> 

#include <cgicc/Cgicc.h>
#include <cgicc/HTTPHTMLHeader.h>
#include <cgicc/HTMLClasses.h>
#include <sys/mman.h>

#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>

#include "FCgiIO.h"
#include "hiredis.h"

#include <string.h>


using namespace std;
using namespace cgicc;

#define FILENAMEMAX 128
#define EXEC_TIMEOUT 20 //execut cmmoand timeout.
#define FILE_MAX_SIZE     1024*1024 //Bit
#define DEFAULT_REDIS_IP      "127.0.0.1"
#define REDIS_PORT            (6379)
#define REDIS_BUFFLEN          128


int ast_running()
{
	if ((access("/var/run/asterisk.ctl", F_OK)) == -1) {
		return 0; 
	}

	if ((access("/tmp/analog/channels", F_OK)) == -1) {
		return 0;
	}
	return 1;
}

char *__cut_str(char *buf, char *start, char *end, char *save, int size)
{
	char *findstart, *findend;
	char *ret;
	int len;

	save[0] = '\0';

	if (buf == NULL) {
		return NULL;
	}

	findstart = strstr(buf, start);
	if (!findstart) {
		return NULL;
	}
	findstart += strlen(start);

	//trim left
	while ((*findstart == '\n') || (*findstart == '\r') || (*findstart == '\t') || (*findstart == ' ')) {
		findstart++;
	}

	if (end == NULL) {
		findend = buf + strlen(buf);
		ret = NULL;
	} else {
		findend = strstr(buf, end);
		if (!findend) {
			return NULL;
		}
		ret = findend;
	}

	//trim right
	while ((findend > findstart) && (*(findend-1) == '\n') || (*(findend-1) == '\r') || (*(findend-1) == '\t') || (*(findend-1) == ' ')) {
		findend--;
	}

	len = findend - findstart;
	if (len < 0 || len >= size ) {
		return NULL;
	}

	strncpy(save, findstart, len);
	save[len] = '\0';
	return ret;
}

struct analog_info {
	int port;
	char cid[80];
	char context[80];
	char sigtype[20];
	char status[128];
	char line[20];
	char voltage[20];
};

static int get_redis_data( char *key, char *outbuff, int outlen) {

	redisContext *rc = NULL;
	redisReply *reply = NULL;

	if(!outbuff || !key) {
		return -1;
	}

	rc = redisConnect(DEFAULT_REDIS_IP, REDIS_PORT);
	if (rc->err) {
		printf( "can't connect to redis\n");
		return -1;
	}
 
	reply = (redisReply *)redisCommand(rc, "get %s", key);
	if ( (reply != NULL)  && (reply->str != NULL) ) {
		if(strlen(reply->str) > outlen) {
			printf("get hredis len out of range(%d)!", strlen(reply->str));
			memcpy(outbuff, reply->str, outlen);
		} else {
			memcpy(outbuff, reply->str, strlen(reply->str));
		}
		
		printf("redis_data:%s=%s\n", key, outbuff);
		freeReplyObject(reply);	
	} else {
		redisFree(rc);	
		return -1;
	}
	
	redisFree(rc);	
	return 0;
}


void analog_output_json(struct analog_info *info, char *outbuf, int outbuflen)
{
	snprintf(outbuf, outbuflen,
			"\"%d\":[{\"port\":%d,"
			"\"callerid\":\"%s\","
			"\"context\":\"%s\","
			"\"sigtype\":\"%s\","
			"\"status\":\"%s\","
			"\"voltage\":\"%s\","
			"\"line\":\"%s\"}],",
			info->port,info->port,
			info->cid,
			info->context,
			info->sigtype,
			info->status,
			info->voltage,
			info->line);
}

void get_analoginfo(FCgiIO *IO)
{
/* 
Format:  
[1]
CallerID=302
Context=fxs-1-sip-302-172.16.2.201
SignalType=FXO Kewlstart
Status=OnHook
Line=Connected

[2]
CallerID=303
Context=fxs-2-sip-303-172.16.2.201
SignalType=FXO Kewlstart
Status=OnHook
Line=Connected

[3]
CallerID=8003
Context=fxs-3
SignalType=FXO Kewlstart
Status=OnHook
Line=Connected

[4]
CallerID=8004
Context=fxs-4
SignalType=FXO Kewlstart
Status=OnHook
Line=Connected

[5]
CallerID=8005
Context=fxs-5
SignalType=FXO Kewlstart
Status=OnHook
Line=Connected

[6]
CallerID=8006
Context=fxs-6
SignalType=FXO Kewlstart
Status=OnHook
Line=Connected

[7]
CallerID=8007
Context=fxs-7
SignalType=FXO Kewlstart
Status=OnHook
Line=Connected

[8]
CallerID=8008
Context=fxs-8
SignalType=FXO Kewlstart
Status=OnHook
Line=Connected

*/
	if(ast_running()) {
		char tmpbuf[32];
		char fbuf[4096], buf[1024] = {0};
		char filename[32];
		char *p;
		int len;
		int fd, i;
		struct analog_info info;
		DIR *dir;
		struct dirent *ptr;

		if ((dir=opendir("/tmp/analog/channels")) == NULL)
		{
			perror("Open dir error...");
			exit(1);
		}
		
		while ((ptr=readdir(dir)) != NULL)
		{
			if(strcmp(ptr->d_name,".")==0 || strcmp(ptr->d_name,"..")==0)	 ///current dir OR parrent dir
				continue;

			sprintf(filename,"/tmp/analog/channels/%s",ptr->d_name);
			fd = open(filename,O_RDONLY);
			if(fd < 0){
				continue;
			}
			flock(fd, LOCK_SH);
			memset(fbuf,0,sizeof(fbuf));
			len = read(fd, fbuf, sizeof(fbuf));
			flock(fd, LOCK_UN);
			close(fd);
			if(len < 10){
				continue;
			}

			info.port = atoi(ptr->d_name);
			*IO << buf;
			memset(buf,0,sizeof(buf));
			
			p = __cut_str(fbuf, "CallerID=", "Context=", info.cid, sizeof(info.cid));
			p = __cut_str(fbuf, "Context=", "SignalType=", info.context, sizeof(info.context));
			p = __cut_str(fbuf, "SignalType=", "Status=", info.sigtype, sizeof(info.sigtype));
			p = __cut_str(fbuf, "Status=", "Voltage=", info.status, sizeof(info.status));
			p = __cut_str(fbuf, "Voltage=", "Line=", info.voltage, sizeof(info.voltage));

			//'line' at the end of file
			p = __cut_str(fbuf, "Line=", NULL, info.line, sizeof(info.line));
			analog_output_json(&info, buf, sizeof(buf));
		}
		
		closedir(dir);
		if(buf[strlen(buf) - 1] == ','){
			buf[strlen(buf) - 1] = '\0';
		}
		*IO << buf;
	}
}


void process_log(FCgiIO *output, const char *log_type, const char *method, const char *size, const char *port)
{
	//Test
	//Update
	//http://172.16.99.1/service?action=process_log&log_type=sip_log&method=update&port=1&size=100
	//Delete
	//http://172.16.99.1/service?action=process_log&log_type=sip_log&method=clean&port=1
	//Get contents
	//http://172.16.99.1/service?action=process_log&log_type=sip_log&method=getcontents&port=1

	char logfile[256];
	char *tmp = "/var/log/asterisk";
	char *tmp_dahdi = "/var/log";
	char tmpfile[128] = "0";

	if (log_type == NULL) {
		return;
	}

	if (!strcasecmp(log_type, "sip_log")) {
		sprintf(tmpfile, "%s/sip-log", tmp);
		printf("sip_log=[%s]\n", tmpfile);
	//	strncpy(logfile, "/tmp/log/asterisk/sip-log", sizeof(logfile));
	} else if (!strcasecmp(log_type, "ast_log")) {
		sprintf(tmpfile, "%s/log4gw", tmp);
		printf("ast_log=[%s]\n", tmpfile);
	//	strncpy(logfile, "/tmp/log/asterisk/log4gw", sizeof(logfile));
	} else if (!strcasecmp(log_type, "sys_log")) {
		sprintf(tmpfile, "/data/log/sys-log");
		printf("sys-log=[%s]\n", tmpfile);
	//	strncpy(logfile, "/data/log/sys-log", sizeof(logfile));
	} else if (!strcasecmp(log_type, "dahdi_log")) {
		sprintf(tmpfile, "%s/dahdi-log", tmp_dahdi);
		printf("dahdi_log=[%s]\n", tmpfile);
	} else {
		return;
	}
	strncpy(logfile, tmpfile, sizeof(logfile));

	if (method == NULL) {
		return;
	}

	if (!strcasecmp(method, "clean")) {
		truncate(logfile, 0);
		*output << "0&";
		return;
	} else if(!strcasecmp(method, "getcontents")) {
		int fd;
		char *pfile;
		int flength;

		fd = open(logfile, O_RDONLY);
		if (fd < 0) {
			return;
		}

		flength = lseek(fd, 0, SEEK_END);

		if (flength <= 0) {
			close(fd);
			return;
		}

		if(lseek(fd, 0, SEEK_SET) < 0) {
			close(fd);
			return;
		}	

		if ((pfile = (char *)mmap(0, flength, PROT_READ, MAP_SHARED, fd, 0)) == ((void *)-1)) {
			close(fd);
			return;
		}

		*output << pfile;
		munmap((void *)pfile, flength);

		close(fd);
	} else 	if(!strcasecmp(method, "update")) {

		if (size == NULL) {
			return;
		}

		int nsize;
		nsize = atoi(size);

		if (nsize < 0 ) {
			return;
		}

		int fd;
		char *pfile;
		int flength;

		fd = open(logfile, O_RDONLY);
		if (fd < 0) {
			return;
		}

		flength = lseek(fd, 0, SEEK_END);

		if (flength <= 0) {
			close(fd);
			return;
		}

		if (flength == nsize) {
			close(fd);
			*output << flength << "&";
			return;
		} else if(flength > nsize) {
			if(lseek(fd, nsize, SEEK_SET) < 0) {
				close(fd);
				return;
			}

			char readbuf[1024+1];
			int readlen;
			char tmp[32];

			*output << flength << "&";

			while ((readlen = read(fd, readbuf, sizeof(readbuf)-1)) > 0) {
				readbuf[readlen] = '\0';
				*output << readbuf;
			}

			close(fd);
			return;
		} else {
			if(lseek(fd, 0, SEEK_SET) < 0) {
				close(fd);
				return;
			}

			if ((pfile = (char *)mmap(0, flength, PROT_READ, MAP_SHARED, fd, 0)) == ((void *)-1)) {
				close(fd);
				return;
			}

			*output << flength << "&";
			*output << pfile;
			munmap((void *)pfile, flength);

			close(fd);
			return;

		}
	}
}

void exec_astcmd(FCgiIO* output,const char *cmd)
{
	char cmd_copy[1024];
	char astcmd[1024];
	FILE *stream;
	char readbuf[1024+1];
	int len;
	time_t stime;

	strncpy(cmd_copy,cmd,sizeof(cmd_copy));

	snprintf(astcmd,sizeof(astcmd),"asterisk -rx \"%s\"",cmd_copy);

	stime = time(NULL);

	if( (stream = popen(astcmd, "r")) == NULL ) {
		return;
	}

	while( (len = fread(readbuf,1,sizeof(readbuf)-1,stream)) > 0 ) {
		readbuf[len] = '\0';
		*output << readbuf;
		output->flush();

		if ((time(NULL) - stime) > EXEC_TIMEOUT) {
			break;
		}
	}
	pclose(stream);
}


void exec_syscmd(FCgiIO* output,const char *cmd)
{
	char cmd_copy[1024];
	FILE *stream;
	char readbuf[1024+1];
	int len;
	time_t stime;

	strncpy(cmd_copy,cmd,sizeof(cmd_copy));

	stime = time(NULL);
	if( (stream = popen(cmd_copy, "r")) == NULL ) {
		return;
	}

	while( (len = fread(readbuf,1,sizeof(readbuf)-1,stream)) > 0 ) {
		readbuf[len] = '\0';
		*output << readbuf;
		output->flush();

		if ((time(NULL) - stime) > EXEC_TIMEOUT) {
			break;
		}
	}
	pclose(stream);
}

#if 0
void get_remote_file()
{
    const_file_iterator file;
    file = cgi.getFile("userfile");

    if(file != cgi.getFiles().end()) {

      cout << table() << endl;

      cout << tr() << td("Name").set("class","title")
           << td(file->getName()).set("class","data") << tr() << endl;

      cout << tr() << td("Data Type").set("class","title")
           << td(file->getDataType()).set("class","data") << tr() << endl;

      cout << tr() << td("Filename").set("class","title")
           << td(file->getFilename()).set("class","data") << tr() << endl;

      cout << tr() << td("Data Length").set("class","title")
           << td().set("class","data") << file->getDataLength()
           << td() << tr() << endl;

      cout << tr() << td("File Data").set("class","title")
           << td().set("class","data") << pre();
      file->writeToStream(cout);

}
	#endif


/*
void sigroutine(int dunno) 
{
	switch (dunno) { 
	case SIGTERM:
	case SIGKILL:
		exit(1);
		return;
	}
} 
*/

/*
int connect_ami()
{
	int sd_client;
	u_short iPort;
	struct sockaddr_in addr_srv;
	struct hostent *ptrHost;
	char response[65535];
	char *pszHost;
	char msg[1024];
	
	pszHost = "172.16.70.121";
	iPort = 5038;

	if((sd_client = socket(PF_INET, SOCK_STREAM, 0)) <0)
		printf("no more socket resources");
		return NULL;
	}

	ptrHost = gethostbyname(pszHost);
		
	if (!ptrHost) {
		printf("cannot resolve hostname");
		return NULL;
	}

	addr_srv.sin_family = AF_INET;
	memcpy((char *) &(addr_srv.sin_addr), ptrHost->h_addr, ptrHost->h_length);
	addr_srv.sin_port = htons(iPort);
	
	if( 0!=connect(sd_client, (struct sockaddr *) &addr_srv,sizeof(addr_srv)) )	
		printf("cannot connect to server");
		return NULL;
	}

	strcpy(msg,"Action: Login\r\nUsername:admin\r\nSecret:admin\r\n\r\n");
	send (sd_client, msg, strlen(msg)+1, 0);

	memset(response, 0, sizeof(response));
	recv(sd_client, response, sizeof(response), 0);

	strcpy(msg,"\r\nAction: Command\r\nCommand: core show version\r\n\r\n");
	send (sd_client, msg, strlen(msg)+1, 0);

	memset(response, 0, sizeof(response));
	recv(sd_client, response, sizeof(response), 0);

	closesocket(sd_client);
}
*/

int 
readfile(const char *filename, char *buf){
	FILE *fp = fopen(filename, "r");
	if(!fp)
		return -1;
	fseek(fp, 0, SEEK_END);
	int size = ftell(fp);
	if(size > FILENAMEMAX)
		return -1;
	//char tmp[FILENAMEMAX] = {0};
	rewind(fp);
	fread(buf, size-1, 1, fp);
	fclose(fp);
	return 0;
}

int log_write(const char *buff, int fd) {
	int res = 0;
	res = write(fd, buff, strlen(buff));
	return res;
}

int __rename(const char *oldname, const char *newname)
{
	FILE *pf = fopen(oldname, "r");
	if(pf == NULL) {
		printf("open a.txt file failed!\n");
		return -1;
	}
	 
	FILE *pf2 = fopen(newname, "w");
	if(pf2 == NULL) {
		printf("open b.txt file failed!\n");
		fclose(pf);
		return -1;
	}
	 
	char ch;
	while(!feof(pf)) {
		ch = fgetc(pf);
		putchar(ch);
		fputc(ch, pf2);   
	}
	
	fclose(pf2);
	fclose(pf);
	return 0;
}

int im_exec_cmd(const char *cmd, char *result, const char *delimter, int bufsize){
	if(cmd == NULL){
		return -1;
	}
//`o	char tmp[bufsize] = {0};
	char tmp[1024] = {0};
	FILE *file = popen(cmd, "r");
	if(!file)
		return -1;
	fread(tmp, 1, bufsize , file);
	if(result){	
		if(strlen(tmp) > 0){
			strncat(result, tmp, bufsize);
		}
		if(delimter)
			strncat(result, delimter, bufsize);
	}
	fclose(file);
	return 0;
}


int upload(Cgicc &cgi, FCgiIO &IO){

	int fd = open("/tmp/service.log", O_RDWR|O_CREAT);
	if(fd < 0)
		return -1;
	
	IO << "Content-Type:text/html\n\n";
	IO.flush();
	const_file_iterator file_iter = cgi.getFile("uploadfile1");	
	const_form_iterator page_name = cgi.getElement("page_name");
	const_form_iterator type = cgi.getElement("type");
	string page_name_str = page_name->getValue();
	string ws_api_reload = "";
	if(file_iter != cgi.getFiles().end()){
		const FormFile& file = *file_iter;
		char name[256] = {0};
		//std::cout << "data: " << file.getData() << std::endl;
		
		if(page_name_str == "system-general"){
			if(file.getFilename() == "english" || file.getFilename() == "chinese")
				sprintf(name, "/www/lang/%s", file.getFilename().c_str());
			else{
				if(access("/etc/asterisk/gw/web_language/", F_OK) != 0)
					system("mkdir -p /etc/asterisk/gw/web_language/");
				sprintf(name, "/etc/asterisk/gw/web_language/%s", file.getFilename().c_str());
			}
			
			fstream input;
			input.open(name, fstream::in|fstream::out|fstream::trunc);
			if(!input.is_open()){
				IO << "<script>window.location.href = 'window.location.protocol//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
				return -1;
			}
			input << file.getData();
            input.seekp(0, ios::beg);
            string language_str;
            if(getline(input, language_str )){//灏嗘柊澧炵殑璇█鍖呮坊鍔犲埌web_language.conf [list]涓?
                int key = language_str.find("#");
                if(key > language_str.size()){
				    IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
					    	  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
			        input.close();
				    return -1;
                }
                string language_str_line = language_str.substr(key+1);
                language_str_line.replace(language_str_line.find("#"), 1, "=");
                fstream language_conf;
                if(access("/etc/asterisk/gw/web_language.conf", F_OK) != 0){
                    language_conf.open("/etc/asterisk/gw/web_language.conf", ios::out);
                    language_conf << "[general]\nlanguage=english\n\n";
                    language_conf << "[list]\nenglish=English\n";
                }else{
                    string language_tmp;
			std::stringstream language_tmp_s; 
                    int flag = 0;
                    language_conf.open("/etc/asterisk/gw/web_language.conf", ios::out|ios::in);
                    language_tmp_s << language_conf.rdbuf();
			language_tmp = language_tmp_s.str();
                    if(strstr(language_tmp.c_str(), "list")){
                    	flag = 1;
                    }
	
                    language_conf.seekg(0, ios::end);
                  	if(flag == 0){
				language_conf << "[list]\nenglish=English\n";
			}
                }
		   if(!language_conf.is_open()){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						 << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
			  
		   }
                language_conf << language_str_line <<"\n"; 
                language_conf.close();
            }else{ 
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
			    input.close();
				return -1;
            }
            
			input.close();
			
		}else if(page_name_str == "sip-security"){
			sprintf(name, "/etc/asterisk/keys/%s", file.getFilename().c_str());

			ofstream input;
			input.open(name);
			if(!input.is_open()){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
				return -1;
			}
			input << file.getData();
			input.close();		
			
		}else if(page_name_str == "system-tools"){
			char cmd[256] = {0};
			char cfg_version[128] = {0};
			char cfg_ver_list[128] = {0};
			char new_name[256] = {0};
			char old_name[256] = {0};
			char firmware_path[32] = {0};
			int status;
			int res;

			res = get_redis_data("system.firmware.path", firmware_path, REDIS_BUFFLEN);
			if(res < 0) {
				printf("system.firmware.path fail!\n"); 	
			}
			
			sprintf(name, "%s/%s", firmware_path, file.getFilename().c_str());
			memcpy(old_name, name, 256);
			
			ofstream input;
			input.open(name);
			if(!input.is_open()){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
				return -1;
			}

			input << file.getData();
			
			//IO << file.getSize();
			input.close();	

			if(type->getValue() == "system_update"){
				log_write(name, fd);
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						<< page_name_str << ".html?type=" << type->getValue() << "&tip=true" << "';</script>" << "\n";	
				return 0;			
#if 0				
//				char res[1024] = {0};
//				sprintf(cmd, "ls -al %s", name);
//				im_exec_cmd(cmd, res, "\n", 1024);
//				log_write(res, fd);
//				sprintf(cmd, "/tools/unpack.sh %s > /data/log/update.txt", name);	
//				im_exec_cmd(cmd, res, "\n", 1024);
				log_write(name, fd);
				
//				if(system(cmd) < 0){	
				{
						IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
								  << page_name_str << ".html?type=" << type->getValue() << "&tip=true" << "';</script>" << "\n";	
						return 0;
				}
/*				
				if(WEXITSTATUS(status) != 0){	
					IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
							  << page_name_str << ".html?type=" << type->getValue() << "&tip=false2" << "';</script>" << "\n";	
					return 0;
				}
*/
				sprintf(cmd, "/tmp/upgrade.sh > /data/log/update.txt");
				
				if(system(cmd) < 0){	
					IO << "<script>window.location.href = window.location.protocol+ '//'+window.location.host+'/views/" 
							  << page_name_str << ".html?type=" << type->getValue() << "&tip=false3" << "';</script>" << "\n";	
					return 0;
				}
/*
				if(WEXITSTATUS(status)){	
					IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
							  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
					return 0;
				}
				system("rm -rf /data/update_file_*");
*/		
#endif	
			}else if(type->getValue() == "file_upload"){		

				sprintf(new_name, "/tmp/tmp_conf");
				res = __rename(name,new_name);
	//			if(!res) {
	//				memset(name, 0, sizeof(name));
	//				memcpy(name, new_name, sizeof(new_name));
	//			}
				
				int filesize = file.getDataLength();
				if(filesize > FILE_MAX_SIZE){
					unlink(name);
					IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
							  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
					return -1;
				}			
				sprintf(cmd, "tar xz -f %s -C /tmp asterisk/cfg_version", new_name);
				res = system(cmd);
				int cfg_res = readfile("/tmp/asterisk/cfg_version", cfg_version);
				int list_res = readfile("/version/cfg_ver_list", cfg_ver_list);
				if(res < 0 || cfg_res< 0 || list_res < 0 || (strstr(cfg_ver_list, cfg_version) == NULL) || strstr(cfg_version, cfg_ver_list) == NULL){
					system("rm -rf /tmp/asterisk/");
					sprintf(cmd, "rm %s -rf", name);
					system(cmd);
					IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/"
							  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
					return -1;
				}
				system("/etc/init.d/asteriskd stop > /dev/null");
				system("rm -rf /etc/asterisk/*");
				sprintf(cmd, "tar zxf %s -C /etc/", new_name);
				system(cmd);
				unlink(name);
				unlink(new_name);
				system("rm -rf /tmp/asterisk/");
				system("/etc/init.d/asteriskd start > /dev/null");
				ws_api_reload = "&reload=true";
			}
		}else if(page_name_str == "network-openvpn"){
			char cmd[256] = {0};
			char new_name[256] = {0};
			char suffix[10] = {0};
			int name_len = 0;
			sprintf(name, "/tmp/%s", file.getFilename().c_str());
			name_len = strlen(name);
			memcpy(suffix, &name[name_len-4], 4);

			int filesize = file.getDataLength();
			if(filesize > FILE_MAX_SIZE){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
				return -1;
			}

			ofstream input;
			input.open(name);
			if(!input.is_open()){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
				return -1;
			}
			input << file.getData();
			input.close();

			sprintf(new_name, "/tmp/tmp_vpnconf");
			int res = __rename(name,new_name);
//			if(!res) {
//				memset(name, 0, sizeof(name));
//				memcpy(name, new_name, sizeof(new_name));
//			}
				
			if(access("/etc/asterisk/openvpn", F_OK)!=0)
				mkdir("/etc/asterisk/openvpn", 0664);
			else
				system("rm /etc/asterisk/openvpn/*");
			system("/etc/init.d/vpn stop");

			if(!strcmp(suffix, "ovpn"))
				sprintf(cmd, "cp -rf %s /etc/asterisk/openvpn/%s", new_name, file.getFilename().c_str());
			else
				sprintf(cmd, "tar zxf  %s -C /etc/asterisk/openvpn", new_name);
			system(cmd);
			unlink(name);
			unlink(new_name);
			system("/etc/init.d/vpn start");

		}else if (page_name_str == "set-info") {
		
			char cmd[256] = {0};
			char new_name[256] = {0};
			int name_len = 0;
			sprintf(name, "/data/log/%s", file.getFilename().c_str());
			name_len = strlen(name);
			
			int filesize = file.getDataLength();
			if(filesize > FILE_MAX_SIZE){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false1" << "';</script>" << "\n";	
				return -1;
			}

			ofstream input;
			input.open(name);
			if(!input.is_open()){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false2" << "';</script>" << "\n";	
				return -1;
			}
			input << file.getData();
			input.close();

			sprintf(new_name, "/data/log/header_image.jpeg");
			if(strcmp(name, new_name)) {
				__rename(name,new_name);
				unlink(name);
			}

		}else if (page_name_str == "alg-calltest") {

			char cmd[256] = {0};
			char new_name[256] = {0};
			char name_wav[126] = {0};
			int name_len = 0;
			sprintf(name, "/data/log/%s", file.getFilename().c_str());
			name_len = strlen(name);
		
			int filesize = file.getDataLength();
			if(filesize > FILE_MAX_SIZE){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false1" << "';</script>" << "\n";	
				return -1;
			}
			
			ofstream input;
			input.open(name);
			if(!input.is_open()){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false2" << "';</script>" << "\n";	
				return -1;
			}
			input << file.getData();
			input.close();
			
			sprintf(new_name, "/data/log/demo-instruct.ulaw");
			if(strcmp(name, new_name)) {
				__rename(name,new_name);
				unlink(name);
			}

			sprintf(name_wav, "/data/log/demo-instruct.wav");
			unlink(name_wav);
			sprintf(cmd, "/tools/pcm2wav ulaw %s %s 1", new_name, name_wav);
			system(cmd);
		} else{
			sprintf(name, "/tmp/%s", file.getFilename().c_str());

			ofstream input;
			input.open(name);
			if(!input.is_open()){
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>" << "\n";	
				return -1;
			}
			input << file.getData();
			input.close();			
		}

		const_file_iterator file_iter2 = cgi.getFile("uploadfile2");
		if(file_iter2 != cgi.getFiles().end()){
			const FormFile& file2 = *file_iter2;
			char name2[128] = {0};
			char new_name[256] = {0};
			//std::cout << "data: " << file.getData() << std::endl;
			ofstream input2;
			if(page_name_str == "system-general"){
				sprintf(name2, "/www/lang/%s", file2.getFilename().c_str());
			}else if(page_name_str == "sip-security"){
				sprintf(name2, "/etc/asterisk/keys/%s", file2.getFilename().c_str());
			}else if(page_name_str == "set-info"){
				sprintf(name2, "/data/log/%s", file2.getFilename().c_str());
				int filesize = file2.getDataLength();
				if(filesize > FILE_MAX_SIZE){
					IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
							  << page_name_str << ".html?type=" << type->getValue() << "&tip=false1" << "';</script>" << "\n";	
					return -1;
				}
			}else{
				sprintf(name2, "/data/%s", file2.getFilename().c_str());
			}

			input2.open(name2);
			if(!input2.is_open()){
				std::cout << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
						  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>\n";	
				return -1;
			}
			input2 << file2.getData();
			input2.close();
			if(page_name_str == "set-info"){
				sprintf(new_name, "/data/log/footer_image.jpeg");
				if(strcmp(name2, new_name)) { 
					__rename(name2,new_name);
					unlink(name2);
				}
			}
		}
		IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
				  << page_name_str << ".html?type=" << type->getValue() << "&tip=true" << ws_api_reload<< "';</script>\n";	
	}
	else{
		IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/" 
				  << page_name_str << ".html?type=" << type->getValue() << "&tip=false" << "';</script>\n" ;	
		return -1;
	}	
	return 0;
}


int
downFile( const char *filename, FCgiIO &IO)
{
	//char buff[65535];
	//int n;
	time_t tp;
	//FILE *fp=NULL;
	struct stat s;
	tp=time(NULL);
	stat(filename, &s);
	ofstream out;
	IO << "HTTP/1.0 200 OK\nServer: lion\nMime-Version:1.0\nDate: " << ctime(&tp)<< "X-LIGHTTPD-send-file: \r\n" << "Content-Transfer-Encoding: binary" << "\r\n";
	IO << "Content-Type: application/octet-stream\r\nContent-Length: " << s.st_size << "\r\n";
//	IO << "Content-Transfer-Encoding: binary\r\n";
	IO << "Content-Disposition: attachment; filename=" << strrchr(filename, '/' )+1 << "\r\n";
	IO << "Connection: close\r\n\r\n";	
	IO.flush();
	//fp=fopen(filename,"rb");
	out.open(filename, ios::in|ios::binary);
//	if(fp == NULL){
//		IO << "open file failed!\n";
//		return -1;
//	}
	//while ((n=fread(buff, sizeof(char),65535,fp))>0){
		IO << out.rdbuf();
	//}
	IO.flush();
	
	//fclose(fp);
}


int download(Cgicc& cgi, FCgiIO &IO){
	
	const_form_iterator downloadfile = cgi.getElement("downloadfile");
	const_form_iterator page_name = cgi.getElement("page_name");
	// cgicc::const_form_iterator type = cgi->getElement("type");
	string filename_str, page_name_str;
	if((downloadfile != (*cgi).end()) && !downloadfile->isEmpty()){
	//	std::cout << downloadfile->getValue() << std::endl;
		filename_str=downloadfile->getValue();
		page_name_str = page_name->getValue();
		
		const char *name = filename_str.c_str();
		char filename[FILENAMEMAX] = {0};
		if(!strcmp(page_name_str.c_str(), "system-general")){//download system-general
			if(!strcmp(name, "english") || !strcmp(name, "chinese"))
                sprintf(filename, "/www/lang/%s", name);
            else
                sprintf(filename, "/etc/asterisk/gw/web_language/%s", name);
			if(access(filename, F_OK) != 0){
				IO << "Content-Type:text/html\n\n";
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/404.html'</script>\n" ;	
				return -1;
			}
			if(downFile(filename, IO) < 0)
				return -1;
		}else if(!strcmp(page_name_str.c_str(), "system-tools")){
			time_t tp;
			struct tm *tt;
			tp = time(NULL);
			tt = localtime(&tp);
			if(!strcmp(name, "config")){
				char version[FILENAMEMAX] = {0};
				char cmd[FILENAMEMAX] = {0};
				readfile("/etc/asterisk/cfg_version", version);
				sprintf(filename, "/etc/config-%s-%d.%d.%d.tar.gz", version, tt->tm_year + 1900, tt->tm_mon + 1, tt->tm_mday);
				mkdir("/data/asterisk", 0666);
				chdir("/etc/asterisk");
				system("cp -R `ls /etc/asterisk` /data/asterisk");
				sprintf(cmd, "tar cz -f %s -C /data asterisk", filename);
				system(cmd);
				system("rm -rf /data/asterisk");
				sleep(1);
				if(downFile(filename, IO) < 0)
					return -1;
				memset(cmd, 0, FILENAMEMAX);
				sprintf(cmd, "rm %s", filename);
				system(cmd);
			}else{
				const_form_iterator channel = cgi.getElement("channel");
				string channel_str = channel->getValue();
				sprintf(filename, "/tmp/sound-%d-%d-%d_%s.tar.gz", tt->tm_year + 1900, tt->tm_mon + 1, tt->tm_mday, channel_str.c_str());
				char cmd[FILENAMEMAX] = {0};
				sprintf(cmd, "tar cz -f %s -C /tmp/ streamrx_%s.raw streamtx_%s.raw", filename, channel_str.c_str(), channel_str.c_str());
				system(cmd);
				sleep(1);
				if(downFile(filename, IO) < 0)
					return -1;
				sleep(1);
				//delete .raw .tar.gz
				memset(cmd, 0, FILENAMEMAX);
				sprintf(cmd, "/tools/deleteFile.sh %s /tmp/streamrx_%s.raw /tmp/streamtx_%s.raw &", filename, channel_str.c_str(), channel_str.c_str());
				system(cmd);				
			}
		}else if(page_name_str == "network-toolkit"){//download .pcap
				time_t tp;
				struct tm *tt;
				char cmd[FILENAMEMAX] = {0};
				tp = time(NULL);
				tt = localtime(&tp);
				sprintf(filename, "/tmp/voicemsg_%d_%02d_%02d.tar.gz", tt->tm_year + 1900, tt->tm_mon + 1, tt->tm_mday);
				sprintf(cmd, "tar cz -f %s -C /tmp voicemsg_%d_%02d_%02d.pcap", filename, tt->tm_year + 1900, tt->tm_mon + 1, tt->tm_mday);
				system(cmd);
				sleep(1);
				if(downFile(filename, IO) < 0)
					return -1;
				sleep(1);
				//delete .pcap  .tar.gz
				memset(cmd, 0, FILENAMEMAX);
				sprintf(cmd, "/tools/deleteFile.sh %s /tmp/voicemsg_%d_%02d_%02d.pcap &", filename, tt->tm_year + 1900, tt->tm_mon + 1, tt->tm_mday);
				system(cmd);	

		}else if(!strcmp(page_name_str.c_str(), "sip-security")){//download keys
			sprintf(filename, "/etc/asterisk/tls/%s.tar.gz", name);
			char cmd[FILENAMEMAX] = {0};
			sprintf(cmd, "tar cz -f %s -C /etc/asterisk/tls %s.pem ca.crt", filename, name);
			system(cmd);
			sleep(1);
			if(downFile(filename, IO) < 0)
				return -1;
			sprintf(cmd, "rm %s", filename);
			system(cmd);
		}else if(!strcmp(page_name_str.c_str(), "network-openvpn")){//download	
			char cmd[FILENAMEMAX] = {0};
			strcpy(filename, "/tmp/openvpn.sample_configs.tar.gz");
			sprintf(cmd, "cp -rf /version/openvpn.sample_configs.tar.gz %s", filename);
			system(cmd);			
			if(access(filename, F_OK) != 0){
				IO << "Content-Type:text/html\n\n";
				IO << "<script>window.location.href = window.location.protocol+ '//'+window.location.host+'/views/404.html'</script>\n" ;	
				return -1;
			}
			if(downFile(filename, IO) < 0)
				return -1;
			memset(cmd, 0, FILENAMEMAX);
			sleep(1);
			sprintf(cmd, "rm -rf %s", filename);
			system(cmd);			
		}else if(!strcmp(page_name_str.c_str(), "sip-bendpoints")){
			char cmd[FILENAMEMAX] = {0};
			strcpy(filename, "/tmp/sip_bendpoints.sample_configs.tar.gz");
			sprintf(cmd, "cp -rf /version/sip_bendpoints.sample_configs.tar.gz %s", filename);
			system(cmd);
			if(access(filename, F_OK) != 0){
				  IO << "Content-Type:text/html\n\n";
				  IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/404.html'</script>\n" ;	
				return -1;
			}
			if(downFile(filename, IO) < 0){
				return -1;		
			}
			memset(cmd, 0, FILENAMEMAX);
			sleep(1);
			sprintf(cmd, "rm -rf %s", filename);
			system(cmd);
		}else if(!strcmp(page_name_str.c_str(), "cdr")){
			sprintf(filename, "/tmp/%s", name);
			if(access(filename, F_OK) != 0){
				IO << "Content-Type:text/html\n\n";
				IO << "<script>window.location.href = window.location.protocol+'//'+window.location.host+'/views/404.html'</script>\n" ;	
				return -1;
			}
			if(downFile(filename, IO) < 0)
				return -1;
			char cmd[FILENAMEMAX] = {0};
			sprintf(cmd, "rm %s", filename);
			system(cmd);
		}else{
			IO << "Content-Type:text/html\n\n";
			IO.flush();
			IO << "request error!";
		}
		
	}
	else{
		IO << "download file is not exist!";
		return -1;
	}	
	return 0;
}


int 
main(int , const char **, char **)
{

#ifdef _DEBUG_
	char outbuf[4096];
	outbuf[0] = 0;
	get_analoginfo(outbuf,sizeof(outbuf));
	printf("%s\n",outbuf);
	return 0;
#endif

	/*signal(SIGTERM, sigroutine);
	signal(SIGKILL, sigroutine);*/

	FCGX_Request request;

	FCGX_Init();
	FCGX_InitRequest(&request, 0, 0);

	while(FCGX_Accept_r(&request) == 0) {

		FCgiIO IO(request);
		Cgicc CGI(&IO);
		
		try {

			const_form_iterator action = CGI.getElement("action");

			if ((action != (*CGI).end()) && (!action->isEmpty())) {
				if (action->getValue() == "get_analoginfo") {
				    IO << "Content-Type:text/html\n\n";
				    IO.flush();
					IO << "{";
					get_analoginfo(&IO);
					IO << "}";
				} else if(action->getValue() == "process_log") {
					IO << "Content-Type:text/html\n\n";
					IO.flush();
					const char *log_type = NULL, *method = NULL, *size = NULL, *port = NULL;
					const_form_iterator cgi_log_type, cgi_method, cgi_size, cgi_port;
					cgi_log_type = CGI.getElement("log_type");
					cgi_method = CGI.getElement("method");
					cgi_size = CGI.getElement("size");
					cgi_port = CGI.getElement("port");

					if ((cgi_log_type != (*CGI).end()) && (!cgi_log_type->isEmpty())) {
						log_type = cgi_log_type->getValue().c_str();
					}
					if ((cgi_method != (*CGI).end()) && (!cgi_method->isEmpty())) {
						method = cgi_method->getValue().c_str();
					}
					if ((cgi_size != (*CGI).end()) && (!cgi_size->isEmpty())) {
						size = cgi_size->getValue().c_str();
					}
					if ((cgi_port != (*CGI).end()) && (!cgi_port->isEmpty())) {
						port = cgi_port->getValue().c_str();
					}

					process_log(&IO, log_type, method, size, port);
				}else if(action->getValue() == "upload"){
					upload(CGI, IO);
				}else if(action->getValue() == "download"){
					download(CGI, IO);
#if 0
				} else if(action->getValue() == "astcmd") {
					IO << "Content-Type:text/html\n\n";
					IO.flush();
					const char *cmd = NULL;
					const_form_iterator cgi_cmd = CGI.getElement("cmd");

					if ((cgi_cmd != (*CGI).end()) && (!cgi_cmd->isEmpty())) {
						cmd = cgi_cmd->getValue().c_str();
						exec_astcmd(&IO, cmd);
					}
				} else if(action->getValue() == "syscmd") {
					IO << "Content-Type:text/html\n\n";
					IO.flush();
					const char *cmd = NULL;
					const_form_iterator cgi_cmd = CGI.getElement("cmd");

					if ((cgi_cmd != (*CGI).end()) && (!cgi_cmd->isEmpty())) {
						cmd = cgi_cmd->getValue().c_str();
						exec_syscmd(&IO, cmd);
					}
#endif
#if 0
				} else if (action->getValue() == "kill_self") {
					exit(9);
#endif
				}else if(action->getValue() == "lighttpd"){
					IO << "Content-Type:text/html\n\n";
					IO.flush();
					const_form_iterator type = CGI.getElement("type");
					std::string mode;
					if(type->getValue() == "1"){
						mode = "'https://'";
					}else{
						mode = "'http://'";
					}
					if(system("/etc/init.d/lighttpd restart > /dev/null 2>&1 &") < 0){
						IO << "<script>window.location.href ="<< mode<< "+window.location.host+'/views/" 
						    << "system-login" << ".html?type=" << type->getValue() << "&save=false" << "';</script>" << "\n";	
					}else{
						IO << "<script>window.location.href ="<<mode << "+window.location.host+'/views/" 
						    << "system-login" << ".html?type=" << type->getValue() << "&save=true" << "';</script>" << "\n";
					}
				}else if(action->getValue() == "reboot"){
					IO << "Content-Type:text/html\n\n";
					IO.flush();
					IO << "1\n";
				}else{

				}
			}
		}
		catch(const exception&) {
			// handle error condition
			IO << "exception";
		}
		FCGX_Finish_r(&request);
	}

	return 0;
}
