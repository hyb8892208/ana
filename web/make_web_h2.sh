#!/bin/sh
#Create by mingyang.chen 20191010

. ../build/gcc_path.txt
HOME_PATH=$GW_HOME
CUR_PATH=$WEB_PATH
CUR_SRC_PATH=$CUR_PATH/src
LIGHTTPD_PATH=$CUR_PATH/lighttpd
BUILDFS_DIR=$FS_PATH
BASEFS_PATH=$FS_PATH
LIGHTTPD_OUTPUT=$BUILDFS_DIR
PHP_OUTPUT=$BUILDFS_DIR
GCC=$CROSS_COMPILE_GCC
CPP=$CROSS_COMPILE_CXX
GCC_PREFIX=$CROSS_COMPILE_PREFIX
SSL_PREFIX=$SDK_DSP_LIB_INCLUDE_DIR

if [ x${GW_HOME} = x"" ];then
    echo "get compile path fail from gcc_path.txt"    
    exit 1    
fi

print()
{
	echo "--------------------------------------"
	echo "$1"
	echo "--------------------------------------"
}

error()
{
	echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
	echo "$1"
	echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
	exit 255
}

create_basefs()
{
	cd $HOME_PATH
	mkdir -p $BUILDFS_DIR
	cd $BUILDFS_DIR
	mkdir -p bin usr/bin usr/include usr/lib lib
	cd -
}


compile_cgicc_3_16()
{
	app=cgicc-3.2.16
	print "Compile ${app}"
	rm -rf ${CUR_SRC_PATH}/${app}
	tar vfx ${CUR_PATH}/lighttpd/${app}.tar.bz2 -C ${CUR_SRC_PATH}/
	cd ${CUR_SRC_PATH}/${app}

	./configure --prefix=${BUILDFS_DIR}/usr --host=${GCC_PREFIX}
	if [ x"$?" != x"0" ];then
		error "${app} configure failed"
	fi

	mkdir -p ./doc/html
	touch ./doc/html/index.html
	make
	if [ x"$?" != x"0" ];then
		error "${app} make failed"
	fi

	make install
	cd -
}

compile_cgicc()
{
        app=cgicc-3.2.10
        print "Compile ${app}"
        rm -rf ${CUR_SRC_PATH}/${app}
        tar vfx ${CUR_PATH}/lighttpd/${app}.tar.gz -C ${CUR_SRC_PATH}/
        cd ${CUR_SRC_PATH}/${app}

	sed -i "s/copy_if(fFormData.begin()/cgicc::copy_if(fFormData.begin()/g" ${CUR_SRC_PATH}/${app}/cgicc/Cgicc.cpp

        ./configure --prefix=${BUILDFS_DIR}/usr --host=${GCC_PREFIX} CFLAGS="-g -O2 -Wall -fPIC -D_GLIBCXX_USE_CXX11_ABI=0" CXXFLAGS="-g -O2 -Wall -fPIC -D_GLIBCXX_USE_CXX11_ABI=0" 
        if [ x"$?" != x"0" ];then
                error "${app} configure failed"
        fi

        mkdir -p ./doc/html
        touch ./doc/html/index.html
        make 
        if [ x"$?" != x"0" ];then
                error "${app} make failed"
        fi

        make install
        cd -
}

compile_fcgi()
{
	app=fcgi-2.4.0
	print "Compile ${app}"
	rm -rf ${CUR_SRC_PATH}/${app}
	tar vfx ${CUR_PATH}/lighttpd/${app}.tar.gz -C ${CUR_SRC_PATH}/
	cd ${CUR_SRC_PATH}/${app}

	./configure --host=${GCC_PREFIX} --prefix=${BUILDFS_DIR}/usr CFLAGS="-g -O2 -Wall -fPIC -D_GLIBCXX_USE_CXX11_ABI=0" CXXFLAGS="-g -O2 -Wall -fPIC -D_GLIBCXX_USE_CXX11_ABI=0"
	if [ x"$?" != x"0" ];then
		error "${app} configure failed"
	fi

	sed -i '1i\#define EOF -1' libfcgi/fcgio.cpp
	sed -i "866a        make \$output_obj" libtool

	make
	if [ x"$?" != x"0" ];then
		error "${app} make failed"
	fi

	make install
	cd -
}

compile_gsoap()
{
	app=gsoap-2.8
	print "Compile ${app}"
	print $CUR_PATH
	print $CUR_SRC_PATH
	rm -rf ${CUR_SRC_PATH}/${app}
	unzip ${CUR_PATH}/lighttpd/gsoap_2.8.17.zip -d ${CUR_SRC_PATH}/
	cd ${CUR_SRC_PATH}/${app}

	./configure --prefix=${BUILDFS_DIR}/usr CFLAGS="-g -O2 -Wall -fPIC" CXXFLAGS="-g -O2 -Wall -fPIC" --disable-namespaces
	if [ x"$?" != x"0" ];then
		error "${app} configure failed"
	fi

	sed -i '1i\#define EOF -1' libfcgi/fcgio.cpp
	sed -i "866a        make \$output_obj" libtool

	make
	if [ x"$?" != x"0" ];then
		error "${app} make failed"
	fi

	make install
	cd -
}

compile_pcre()
{
	app=pcre-8.33
	print "Compile ${app}"
	rm -rf ${CUR_SRC_PATH}/${app}
	tar vfx ${CUR_PATH}/lighttpd/${app}.tar.gz -C ${CUR_SRC_PATH}/
	cd ${CUR_SRC_PATH}/${app}

	./configure --host=${GCC_PREFIX} --prefix=${BUILDFS_DIR}/usr CPPFLAGS=-I${BUILDFS_DIR}/usr/include LDFLAGS=-L${BUILDFS_DIR}/usr/lib
	if [ x"$?" != x"0" ];then
		error "${app} configure failed"
	fi

	make
	if [ x"$?" != x"0" ];then
		error "${app} make failed"
	fi

	make install
	cd -
}

<<EOF
compile_lighttpd()
{
#	app=lighttpd-1.4.33
	app=lighttpd-1.4.54
	print "Compile ${app}"
	rm -rf ${CUR_SRC_PATH}/${app}
	tar vfx ${CUR_PATH}/lighttpd/${app}.tar.gz -C ${CUR_SRC_PATH}/
	cd ${CUR_SRC_PATH}/${app}

	PATH=$PATH:${BUILDFS_DIR}/usr/bin
#	./configure --without-bzip2 --with-openssl=${SSL_PREFIX}/usr CFLAGS="-I${BUILDFS_DIR}/usr/include -I${SDK_DIR_INC}" LDFLAGS="-L${BUILDFS_DIR}/usr/lib -L${SDK_DIR_LIB}"
	./configure --host=${GCC_PREFIX} --without-bzip2 --with-openssl=${SSL_PREFIX}/usr CFLAGS="-I${BASEFS_PATH}/usr/include -I${SDK_INCLUDE_DIR}" LDFLAGS="-L${BASEFS_PATH}/usr/lib -L${SDK_LIB_DIR}"
	if [ x"$?" != x"0" ];then
		error "${app} configure failed"
	fi

	make
	if [ x"$?" != x"0" ];then
		error "${app} make failed"
	fi

#	make install
	cd -
}
EOF

compile_lighttpd()
{
       app=lighttpd-1.4.33
        print "Compile ${app}"
        rm -rf ${CUR_SRC_PATH}/${app}
        tar vfx ${CUR_PATH}/lighttpd/${app}.tar.gz -C ${CUR_SRC_PATH}/
        cd ${CUR_SRC_PATH}/${app}

        PATH=$PATH:${BUILDFS_DIR}/usr/bin
#       ./configure --without-bzip2 --with-openssl=${SSL_PREFIX}/usr CFLAGS="-I${BUILDFS_DIR}/usr/include -I${SDK_DIR_INC}" LDFLAGS="-L${BUILDFS_DIR}/usr/lib -L${SDK_DIR_LIB}"
        ./configure --host=${GCC_PREFIX} --without-bzip2 --with-openssl=${SSL_PREFIX}/usr CFLAGS="-I${BASEFS_PATH}/usr/include -I${SDK_INCLUDE_DIR}" LDFLAGS="-L${BASEFS_PATH}/usr/lib -L${SDK_LIB_DIR}"
        if [ x"$?" != x"0" ];then
                error "${app} configure failed"
        fi

        make
        if [ x"$?" != x"0" ];then
                error "${app} make failed"
        fi

#       make install
        cd -
}

compile_curl()
{
	app=curl-7.19.5
	print "Compile ${app}"
	rm -rf ${CUR_SRC_PATH}/${app}
	tar vfx ${CUR_PATH}/php/${app}.tar.bz2 -C ${CUR_SRC_PATH}/
	cd ${CUR_SRC_PATH}/${app}
	cp -f ../../php/configure.curl  configure

	./configure --host=${GCC_PREFIX} --prefix=${BUILDFS_DIR}/usr
	if [ x"$?" != x"0" ];then
		error "${app} configure failed"
	fi

	make
	if [ x"$?" != x"0" ];then
		error "${app} make failed"
	fi

	make install
	cd -
}

compile_php()
{
	app=php-${PHP_VER}
	print "Compile ${app}"
	rm -rf ${CUR_SRC_PATH}/${app}
	tar vfx ${CUR_PATH}/php/${app}.tar.gz -C ${CUR_SRC_PATH}/
	cd ${CUR_SRC_PATH}/${app}

#	./configure --host=${GCC_PREFIX} --prefix=/ --enable-mbstring  --with-sqlite --with-sqlite3 --disable-all --with-openssl=$PREFIX_PATH/usr --enable-pcntl --enable-json --enable-session --enable-sockets --enable-gd-native-ttf --enable-gd-jis-conv --enable-posix --enable-sysvmsg --enable-sysvshm --with-iconv=$PREFIX_PATH/usr --with-curl=$PREFIX_PATH
	./configure --host=${GCC_PREFIX} --prefix=/ --enable-mbstring  --with-sqlite --with-sqlite3 --disable-all --with-openssl=${SSL_PREFIX}/usr --enable-pcntl --enable-json --enable-session --enable-sockets --enable-gd-native-ttf --enable-gd-jis-conv --enable-posix --enable-sysvmsg --enable-sysvshm --with-iconv=${BUILDFS_DIR}/usr --with-curl=${BUILDFS_DIR}/usr LIBS="-ldl" 
	if [ x"$?" != x"0" ];then
		error "${app} configure failed"
	fi

	cd Zend
	php zend_vm_gen.php --without-specializer
	cd -
	sed -i "s/HAVE_ATOMIC_H/DEL_HAVE_ATOMIC_XH/g" ./ext/standard/php_crypt_r.c
	sed -i "s/mdtype = (EVP_MD \*) EVP_ripemd160()/mdtype = NULL/g" ./ext/openssl/openssl.c
	make
	if [ x"$?" != x"0" ];then
		error "${app} make failed"
	fi

#	make install
	cd -
}

compile_webservice()
{
	print "Compile webservice"
	cd ${CUR_PATH}/webservice
	rm -f service
	export CPLUS_INCLUDE_PATH=$CPLUS_INCLUDE_PATH:${BUILDFS_DIR}/usr/include

	make
	if [ x"$?" != x"0" ];then
		error "webservice make failed"
	fi
	cd -
}

compile_all()
{
	if [ -f ${BUILDFS_DIR}/usr/include/cgicc/Cgicc.h -a -f ${BUILDFS_DIR}/usr/lib/libcgicc.so ]; then
		echo "cgicc already exist"
	else
		compile_cgicc
	fi

	if [ -f ${BUILDFS_DIR}/usr/include/fcgio.h -a -f ${BUILDFS_DIR}/usr/lib/libfcgi.so ]; then
		echo "fcgi already exist"
	else
		compile_fcgi
	fi

	if [ -f ${BUILDFS_DIR}/usr/include/pcre.h -a -f ${BUILDFS_DIR}/usr/lib/libpcre.so ]; then
		echo "pcre already exist"
	else
		compile_pcre
	fi

	if [ -f ${CUR_SRC_PATH}/lighttpd-1.4.33/src/lighttpd ]; then
		echo "lighttpd already exist"
	else
		compile_lighttpd
	fi

	if [ -f ${BUILDFS_DIR}/usr/include/curl/curl.h -a -f ${BUILDFS_DIR}/usr/lib/libcurl.so ]; then
		echo "curl already exist"
	else
		compile_curl
	fi

#	if [ -f ${CUR_SRC_PATH}/php-${PHP_VER}/sapi/cgi/php-cgi -a -f ${CUR_SRC_PATH}/php-${PHP_VER}/sapi/cli/php ]; then
#		echo "php already exist"
#	else
#		compile_php
#	fi

	if [ -f ${CUR_PATH}/webservice/service ]; then
		echo "webservice already exist"
	else
		compile_webservice
	fi

#    	if [ -f ${CUR_SRC_PATH}/gsoap-2.8/gsoap/libgsoap++.a ]; then
#        	echo "gsoap already exist"
#    	else
#        	compile_gsoap
#    	fi

}

check_file_path()
{
	if [ ! -d ${BUILDFS_DIR}/bin ]; then
		create_basefs
	fi
	
	if [ ! -d ${CUR_PATH}/src ]; then
		mkdir -p ${CUR_PATH}/src
	fi 
}

main()
{
	TASK="";
	#Parse argument
	while [ $# -gt 0 ]; do
		case $1 in
			"cgicc")
				TASK="$TASK compile_cgicc"
				;;
			"fcgi")
				TASK="$TASK compile_fcgi"
				;;
			"pcre")
				TASK="$TASK compile_pcre"
				;;
			"lighttpd")
				TASK="$TASK compile_lighttpd"
				;;
			"curl")
				TASK="$TASK compile_curl"
				;;
#			"php")
#				TASK="$TASK compile_php"
#				;;
			"webservice")
				TASK="$TASK compile_webservice"
				;;
			"gsoap")
				TASK="$TASK compile_gsoap"
				;;
			*)
				;;
		esac
		shift
	done

	check_file_path

	if [ x"$TASK" != x ]; then
		for T in $TASK ;do
			$T
		done
		exit 0;
	fi

	compile_all

}

main $*

