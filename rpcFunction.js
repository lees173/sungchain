
var userID = 5;
var rpcConnection = require('./rpcConnection');
var userRPC=rpcConnection.userRPC(userID);



module.exports.getInfo=function(callback){
    userRPC.getInfo((err, info) => {
        if(err){
            console.log( err);
        }
        callback(info);
    });

};

module.exports.getListpermissions=function(permission,callback){
    userRPC.listPermissions({"permissions":permission},(err, info) => {
        if(err){
            console.log( err);
        }
        console.log(info);
        callback(info);
    });
};

module.exports.getListNodeAddress=function(callback){
    userRPC.listPermissions({"addresses":"*"},(err, info) => {
        if(err){
            console.log( err);
        }
        console.log(info);
        callback(info);
    })

};
// module.exports.getIssue=function(callback){
//     getListAssets(function(assetInfo){
//         getListpermissions('issue',function(permissionInfo){
//             callback(assetInfo,permissionInfo)
        
//         }); 
//     });
// };


module.exports.getAddresses=function(callback){
    userRPC.getAddresses((err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });

};

module.exports.getAddressBalances=function(addr,callback){
    userRPC.getAddressBalances({address:addr},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
};



module.exports.getListAssets=function(callback){
   
    userRPC.listAssets((err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
};

module.exports.sendAsset=function(toAddr,asset,qty,comment="",commentTo="",callback){

    userRPC.sendAsset({address:toAddr, asset:asset, qty:qty,comment: comment, "comment-to": commentTo},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
};


module.exports.sendAssetFrom=function(fromAddr,toAddr,asset,qty,comment,commentTo,callback){

    userRPC.sendAssetFrom({from:fromAddr, to:toAddr, asset:asset, qty:qty,comment: comment, "comment-to": commentTo},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
};

module.exports.setIssue=function(txtaddress,txtasset,txtamount,txtunit,txtcomment,callback){
    
    userRPC.issue({address: txtaddress, asset: txtasset, qty: parseInt(txtamount), units: parseFloat(txtunit), details: {comment: txtcomment}},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
};

module.exports.getBlockInfo=function(numberofblocks, callback){
    
    userRPC.listBlocks({blocks: "-10"},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
};
module.exports.listStreams=function(callback){
    userRPC.listStreams((err,info)=>{

    if(err){
            console.log( err);
        }
        callback(info);
    });
};



module.exports.createStream=function(name,detail,callback){
    userRPC.create({type:"stream",name:name,open:true,detail:{detail}},(err,info)=>{
        userRPC.subscribe({stream:name},(err,info)=>{
            if(err){
                console.log(err);
            }
            callback(info);       
    });
        
    });

};


module.exports.publish=function(getkey,getdata,callback){
    userRPC.publish({stream:"contract1",key:getkey,data:getdata},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
};
module.exports.publishM=function(stream="mobile01",getkey,getdata,callback){
    userRPC.publish({stream:stream,key:getkey,data:getdata},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
};
module.exports.listStreamItemsM=function(stream="mobile01",callback){
    userRPC.listStreamItems({stream:stream},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });

};

module.exports.listStreamItems=function(callback){
    userRPC.listStreamItems({stream:"contract1"},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });

};
module.exports.getStreamItem=function(txttxid,callback){
    userRPC.getStreamItem({stream:"contract1",txid:txttxid},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
    
};
module.exports.getStreamItemM=function(stream,txttxid,callback){
    userRPC.getStreamItem({stream:stream,txid:txttxid},(err,info)=>{
        if(err){
            console.log( err);
        }
        callback(info);

    });
    
};


module.exports.createKeyPairs=function(callback){
    userRPC.createKeyPairs((err,info)=>{
        if(err){
            console.log(err);
        }
        callback(info);
    });
};


module.exports.grant=function(address,permissions,callback){
    userRPC.grant({addresses:address,permissions:permissions},(err,info)=>{
        if(err){
            console.log(err);
        }
        callback(info);
    });
};

module.exports.importAddress=function(address,callback){
    userRPC.importAddress({address:address},(err,info)=>{
        if(err){
            console.log(err);
        }
        callback(info);

    });
};






