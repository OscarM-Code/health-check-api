let CronJob = require('cron').CronJob;
const Category = require('../model/Category');
const SiteModel = require('../model/Site');
const fetch = require('node-fetch');

let job = new CronJob(' * * * * *',task);

function task(){
    
    let sites = SiteModel.find();
    sites.then((data) => {
        data.map(links => {
            let link = links.link;
            let method = links.method;
           
            fetch(link, {
                method: method
            })
            .then(response => response.status)
            .then(test => {
                //console.log(test);
                let health;
                if(test !== 404 && !test.toString().startsWith("5")){
                    health = true;
                }else{
                    health = false;
                }
                if(test !== links.statusCode){
                    console.log(links);
                    SiteModel.updateOne({_id: links._id}, {statusCode: test, health: health}, (er) => {
                        if(er){
                            console.log(er);
                        }
                        console.log('updated');
                    })
                }
            }).catch(err => {
                if (links.statusCode !== 404 && !links.health) {
                    console.log("Catche:");
                    
                    SiteModel.updateOne({_id: links._id}, {statusCode: 500, health: false}, (er) => {
                        if(er){
                            console.log(er);
                        }
                        console.log("data check and changed (catch)");
                    })
                }
            })
        })
    })

}

 
exports.start = function(){
    job.start();
    console.log('cron job started');
}