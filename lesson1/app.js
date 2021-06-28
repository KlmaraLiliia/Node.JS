const fs = require('fs');
const path = require('path');
/*
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
*/
fs.mkdir(`${__dirname}/boys`,{recursive:true},(err)=>{
    console.log(err)
});
fs.mkdir(`${__dirname}/girls`,{recursive:true},(err)=>{
    console.log(err)
});


function sortSingleFolder(currDirectory) {
    fs.readdir(`${__dirname}/${currDirectory}`, (err, files) => {
        if (err) {
            console.log(err)
            return
        }
        files.forEach(file => {

            fs.readFile(`${__dirname}/${currDirectory}/${file}`, (err1, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                const gender = JSON.parse(data.toString()).gender

                genderCheck(gender, currDirectory, file)

            })
        })

    })
}