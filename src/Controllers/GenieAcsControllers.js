const mongodbURL = 'mongodb://localhost/genieacs'; // Endereço do mongoDB
const genieURL = 'http://localhost:7575'; // Endereço do servidor Genie + porta de acesso
const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({});
const dataModel = mongoose.model('device', dataSchema, 'devices');

const axios = require('axios')


export default class GenieAcsControllers {

    async setTag(req, res) {
        const wanIP = req.query.wanIP
        const tag = req.query.tag
        mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(
                () => {
                    dataModel.find({
                        "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.ExternalIPAddress._value": wanIP
                    }, (err, data) => {
                        const mongoResponse = data[0].toObject();
                        const response = (mongoResponse._deviceId._OUI +
                            "-" + mongoResponse._deviceId._ProductClass +
                            "-" + mongoResponse._deviceId._SerialNumber);
                            console.log(response)

                            axios.post(`${genieURL}${response}/tags/${tag}`)
                            .then(resp=>{
                                res.send('Bloqueio realizado com sucesso')
                            })
                            .catch(error=>{
                                res.send('Houve uma falha ao realizar o bloqueio')
                            })                       
                    })

                },
                err => {
                    console.log(err)
                    res.send('Houve uma falha ao obter o DeviceID')
                }
            );
    }


    async unsetTag(req, res) {
        const wanIP = req.query.wanIP
        const tag = req.query.tag
        mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(
                () => {
                    dataModel.find({
                        "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.ExternalIPAddress._value": wanIP
                    }, (err, data) => {
                        const mongoResponse = data[0].toObject();
                        const response = (mongoResponse._deviceId._OUI +
                            "-" + mongoResponse._deviceId._ProductClass +
                            "-" + mongoResponse._deviceId._SerialNumber);

                            axios.delete(`${genieURL}${response}/tags/${tag}`)
                            .then(resp=>{
                                res.send('Bloqueio removido com sucesso!')
                            })
                            .catch(error=>{
                                res.send('Houve uma falha ao remover o bloqueio!')
                            })


                        
                    })

                },
                err => {
                    console.log(err)
                    res.send('Houve uma falha ao obter o DeviceID')
                }
            );
    }
}
