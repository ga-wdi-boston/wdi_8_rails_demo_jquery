##  Rails JQuery Demo

### Step One
* bundle
* Generate a scaffold controller for the Song model.
     
     ``rails g scaffold Song name:string duration:integer price:float``
* Init the DB.  
	``rake db:drop``  
	``rake db:create``  
	``rake db:migrate``  
	
### Step Two

* Create a seed file for songs and seed db.  
    
    
    ``Song.create(name: "Royals", duration: 186, price: 3.99)``  
    ``Song.create(name: "Wrecking Ball", duration: 195, price: 3.49)``  
    ``Song.create(name: "Roar", duration: 205, price: 2.99)``  
    ``Song.create(name: "Wake me up", duration: 243, price: 2.49)``
    
* Seed the DB.
	``rake db:seed``     
    
* goto /songs and view songs.

### Step Three

* Update the contents of the app/views/songs/index.html.erb file to the below.  
   
    ``<ul id='songs'>``  
	``<%= @songs.each do |song| %>``  
	``<li id='song_<%=song.id%>'>Name: <%=song.name %>``  
  	``<%= link_to "Show", song_path(song), remote: true  %>``  
	``</li>``  
	``<% end %>``  
	``</ul>``  
	``<br>``  

	``<%= link_to 'New Song', new_song_path, id: 'new_link', remote: true %>``  

* Notice that we've added the 'remote: true' to the new and show song link. This will make the form submit an ajax request. It will *not* reload the page.


* Create a new.js.erb file with this contents.  
      `` $('#new_link').hide().after('<%= j render("form") %>')``

* A form will be inserted into the page under the list of songs. How is done?

The javascript in the new.js.erb file is inserted into the page and run.

When you click the new song link:  
1. A HTTP Ajax Request is sent to Rails with the Accept HTTP Header set to 'application/javascript'.  
2. Rails knows that this kind of request is for javascript and will be handled by the new.js.erb file. Rails keeps a mapping between the Mime type, _application/javascript_, and files with a js extention. In this case it will be the new.js.erb file.  
3. ERB will process the code between the <%= %> and insert it. This is contents of the form partial.  
4. This ERB generated javascript is sent back to the browser.  
5. Then the browser will run this javascript/jquery and insert the form _after_ the  element with the id of 'new_link'.
	


### Step Four

* Change the first line of the _form.html.erb to be.    
      `` <%= form_for(@song, :remote => true) do |f| %> ``

* Update the create action to respond to a javascript/ajax request.   

    ``def create``   
    `` ... ``  
    ``  format.js ``  
    ``   .. ``  
    ``end``  
    
* Add a create.js.erb file with the below contents.

    ``$('#new_task').remove();``  
    ``$('#new_link').show();``  
    ``$('#songs').append("<li id='song_" + "<%=@song.id%>'" + "> Name: <%=@song.name %> " + '<%= link_to "Show", song_path(@song), remote: true  %>' + "</li>");``
    ``$('#new_song').hide();``   

* This will use jquery selectors to change the index page.

## Step Five

* Create a file show.js.erb with this contents.  
     ``$('#song_<%=@song.id%>').html("<li><%=@song.name%>,  Duration(minutes): <%=@song.duration%>, Price(dollars): <%=@song.price %></li>");``

* Goto http://localhost:3000/songs and create a new song.  
  Notice how there are *NO* page reloads when creating new songs. All 
   the creations are done via ajax and jquery.

## Resources
[JQuery & Ajax Railscast](http://railscasts.com/episodes/136-jquery-ajax-revised)