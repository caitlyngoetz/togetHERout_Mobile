var newsarticles = [
    {id:0 , title:"Co-op Event", author:"Tony Stark", date:"10/31/2016", time:"9:40am", location:"Anne Morrison", description: "Gathering of startups at the Co-op."},
    {id:1 , title:"Christmas Party", author:"Bruce Banner", date:"12/20/2016", time:"10:10am", location:"Green Belt", description: "Christmas Party at Anne Morrison."},
    {id:2 , title:"Women's walk", author:"John Smith", date:"11/01/2016", time:"11:10am", location:"Gold's Gym", description: "These descriptions don't matter."},
    {id:3 , title:"March for dimes", author:"Peter Parker", date:"11/01/2016", time:"3:10Pm", location:"BSU Rec Center", description: "Learning new stuff is hard."},
    {id:4 , title:"Closing up shop", author:"Sheldon Cooper", date:"11/01/2016", time:"2:00pm", location:"Veterans Memorial", description: "Blah blah blah, is this working."}
];

exports.findAll = function (req, res, next) {
    res.send(newsarticles);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(newsarticles[id]);
};