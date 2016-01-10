/**
 * Created by Pawel on 22.12.2015.
 */

function initGallery()
{
    $.get('/getListOfPicture/0',function(data){
        populateContainer(data,"#imgContainer",'#previewImg','preview');
    });
};

function initUserCard()
{
    $.get('/getListOfPicture/4',{user:true},function(data){
        populateContainer(data,"#UserimgContainer",'#previewImg','preview');
    });
};

function moreData()
 {
 $.get('/getListOfPicture/'+coff.toString(),function(data){
     populateContainer(data,"#imgContainer",'#previewImg','preview');
 });
     coff=coff+4;
 }

function inittemplates()
{
    $.get('/getListOfPicture/templates/',function(data){
        populateContainer(data,"#templateContainer",'#templateImg','templates');
    });
};