var userData = require("../rpcUserData")
exports.userRPC=function(ID){

    multichain = require("multichain-node")({
            
        
        port: userData.userDataPort(ID),
        host: userData.userDataHost(ID),
        user: userData.userDataUser(ID),
        pass: userData.userDataPass(ID)
    });

    return multichain;

}