include ../../../../build/gcc_path.txt

CXX=${CROSS_COMPILE_CXX}
PREFIX_PATH=${FS_PATH}

LD_FLAG=-lcgicc -lfcgi++ -lfcgi -L${PREFIX_PATH}/usr/lib/ -L ${THIRD_PATH}/ag_common_third/third/hiredis-master -lhiredis
INCLUDE=-I${PREFIX_PATH}/usr/include -I${THIRD_PATH}/ag_common_third/third/hiredis-master
CXX_FLAG= -g -D_GLIBCXX_USE_CXX11_ABI=0

all:service
service:service.cpp FCgiIO.cpp
	${CXX} $^ ${CXX_FLAG} ${INCLUDE} ${LD_FLAG} -o $@
.PHONY: clean install

clean:
	rm -f service

install:
	cp service ../../fs-nfs/webservice 
