/**
 * Created by reamd on 2018/3/31.
 */
var exec = require('child_process').exec;

let addZero = t=>{
    let str = t.toString()
    if(str.length === 1){
        return '0' + str
    }else {
        return str
    }
}
let getCommit = ()=>{
    let date = new Date()
    return `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`
}

let master = ()=>{
    return new Promise((resolve, reject)=>{
        exec('hexo d -g', (err,stdout,stderr)=>{
            if(err) {
                reject(stderr);
            } else {
                resolve()
            }
        })
    })
}

let dev = ()=>{
    return new Promise((resolve, reject)=>{
        exec('git add .', (err,stdout,stderr)=>{
            if(err) {
                reject(stderr);
            } else {
                exec(`git commit -m "update ${getCommit()}"`, (err,stdout,stderr)=>{
                    if(err) {
                        reject(stderr);
                    } else {
                        exec('git push origin dev', (err,stdout,stderr)=>{
                            if(err) {
                                reject(stderr);
                            } else {
                                resolve()
                            }
                        })
                    }
                })
            }
        })
    })
}

master()
.then(()=>{
    return dev()
})
.then(()=>{
    console.log('发布成功！')
})
.catch(err=>{
    console.log('发布失败！')
})