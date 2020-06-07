#!/bin/bash

exec_migration(){
    npm run migration --prefix /usr/app
}

seed(){
    npx sequelize-cli db:seed:all
}

start_app(){
    npm run start --prefix /usr/app
}

run(){
    # start with a try
    {   # open a subshell !!!
        echo "Exec migration"
        exec_migration
    }|| {
        echo "New attempt to run migration in 5 seconds"
        sleep 5s
        run
    }
}

run && seed && start_app
