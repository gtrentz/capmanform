const express = require('express');
const sql = require('mssql');
const app = express();

const config = {
    server: 'your_server.database.windows.net',
    database: 'your_database',
    options: {
        encrypt: true
    },
    authentication: {
        type: 'azure-active-directory-msi-app-service',
        options: {
            msiEndpoint: 'http://169.254.169.254/metadata/identity/oauth2/token',
            msiSecret: '',
            resource: 'https://database.windows.net/',
            authority: 'https://login.microsoftonline.com/<your-tenant-id>'
        }
    }
};

app.get('/api/projectrequests', function(req, res) {
    sql.connect(config, function(err) {
        if (err) console.log(err);

        let sqlRequest = new sql.Request();

        let sqlQuery = 'SELECT * FROM ProjectRequests';
        sqlRequest.query(sqlQuery, function(err, data) {
            if (err) console.log(err);
            
            res.json(data.recordset); // this will return the JSON data
        });
    });
});

const server = app.listen(5000, function() {
    console.log('Server is running on port 5000..');
});
