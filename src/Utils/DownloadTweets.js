export const DownloadTweets = (results)=>{
    var tweets = [];
    results.forEach(tweet => {
        tweets.push({"tweet":tweet.text})
    });
    console.log(tweets);
    const fileName = "tweets";
    const json = JSON.stringify(tweets);
    const blob = new Blob([json],{type:'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}