const fs = require('fs');
const path = require('path');

function myFunc(oldPath, newPath, files) {

    files.forEach((file) => {
        fs.rename(path.join(oldPath, file), path.join(newPath, file), err => {
            if (err)
                console.log(err);
        })
    });

}

fs.readdir('./2000', (err, files2000) => {
    if (err)
        console.log(err);

    fs.readdir('./1800', (err, files1800) => {
        if (err)
            console.log(err);
        myFunc('1800', '2000', files1800);

    })

         myFunc('2000', '1800',files2000 );

});
