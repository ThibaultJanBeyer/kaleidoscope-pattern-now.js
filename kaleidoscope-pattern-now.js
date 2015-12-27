/* global app */
/* global ElementPlacement */
/* global Transformation */
//––– Startups
var doc = app.activeDocument;
var p = doc.pathItems; //DOES NOT INCLUDE IMAGES
var artboard = doc.artboards[0];
var ABrect = artboard.artboardRect;
app.beep();

var imgs = doc.selection; //get selection

if (imgs.length < 1) { //if nothing is selected
    alert('Select one or more Images and run the script again');
} else { //if something is selected, let's go
    //––– Settings
    //var person = prompt("Please enter your name", "Harry Potter");
    for (var i = 0; i < imgs.length; i++) {
        //get each img
        var img = imgs[i];
        img.name = 'img'; 
        //get the RADIUS of the triangle
        var radius = triangleSize(img);
        //get the SIZE of the triangle (radius*2) 
        var size = radius * 2;
        //set the positions
        var h = (Math.sqrt(3)/2 * size); //mid axis for triangle
        var posL = img.left + selectFrom(0, (img.width - size));
        var posT = img.top - selectFrom(h, (img.height));      
        //create an empty group for each triangle
        var group = doc.groupItems.add();
        group.name = 'group-1 ';
        var triangle = p.add();
        triangle.setEntirePath([ 
            [posL,posT],
            [(posL + size),posT],
            [(posL + size / 2),(posT + h)]
        ]);
        triangle.closed = true;
        //a triagle could also be done like this: var triangle = p.polygon(posL,posT,radius,3);
        //move the image & triangle to the group
        img.move(group,ElementPlacement.INSIDE);
        triangle.move(group,ElementPlacement.INSIDE);
        //make clipping mask out of group items        
        group.clipped = true;
        //move group to origin
        group.position = [-(posL + size / 2),-(posT + h)];
        var groups = [];
        //create a group to store the triangles we are about to create
        var totalGroupInner = doc.groupItems.add();
        totalGroupInner.name = 'Inner';
        //duplicate groups and rotate them
        for (var j = 0; j < 6; j++) {
            groups[j] = group.duplicate();
            groups[j].name = 'group-' + j;
            //rotate group2 by 60°
            groups[j].rotate(60 * j, true, false, false, false, Transformation.DOCUMENTORIGIN);
            groups[j].move(totalGroupInner,ElementPlacement.INSIDE);   
        }
        doc.selection = null;
        totalGroupInner.selected = true;
    }
}
//        doc.selection = null;

//–– Functions
function triangleSize(img){
    if (img.height < img.width){
        return img.height / Math.floor((Math.random() * 10) + 3);
    } else {
        return img.width / Math.floor((Math.random() * 10) + 3);
    }
}

function selectFrom(startValue, endValue) {
    var iChoices = endValue - startValue;
    return Math.random() * iChoices + startValue;
}
/* Full integer
function selectFrom(startValue, endValue) {
    var iChoices = endValue - startValue + 1;
    return Math.floor(Math.random() * iChoices + startValue);
}
*/
//var img = doc.placedItems.add();
//img.file = new File("/Library/Desktop Pictures/Galaxy.jpg");



/* for (var index = 0; index < p.length; index++) {
    var element = p[index];
    alert(element);
}

/*
var img = doc.placedItems.add();
img.file = new File("/Library/Desktop Pictures/Galaxy.jpg");
img.left = 0;
img.top = 0;



var triangle = p.polygon(100,100,40,3);
*/