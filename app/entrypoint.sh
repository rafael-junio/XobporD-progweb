#!/bin/bash

exec_migration(){
    npm run migration
}

start_app(){
    npm run start
}

run(){
    # start with a try
    {   # open a subshell !!!
        echo "Rodando migration"
        exec_migration
    }|| {
        echo "Nova tentativa de rodar migration daqui 5 segundos"
        sleep 5s
        run
    }
}

run && start_app
