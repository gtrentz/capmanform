const express = require('express');
const sql = require('mssql');
const app = express();

const config = {
    server: 'uihc-unifier.database.windows.net',
    database: 'FormData',
    options: {
        encrypt: true
    },
    authentication: {
        type: 'azure-active-directory-msi-app-service',
        options: {
            msiEndpoint: 'http://169.254.169.254/metadata/identity/oauth2/token',
            msiSecret: '',
            resource: 'https://database.windows.net/',
            authority: 'https://login.microsoftonline.com/1bc44595-9aba-4fc3-b8ec-7b94a5586fdc'
        }
    }
};

app.get('/api/projectrequests', function(req, res) {
    sql.connect(config, function(err) {
        if (err) console.log(err);

        let sqlRequest = new sql.Request();

        let sqlQuery = 'SELECT * FROM FormData';
        sqlRequest.query(sqlQuery, function(err, data) {
            if (err) console.log(err);
            
            res.json(data.recordset);
        });
    });
});

const server = app.listen(5000, function() {
    console.log('Server is running on port 5000..');
});
