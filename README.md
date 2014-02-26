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
    ``<li>Name: <%=song.name %>, Duration(minutes): <%=song.duration %>, Price(dollars): <%=song.price %> </li>``  
    ``<% end %>``  
    ``</ul>``  
    ``<br>``  

    ``<%= link_to 'New Song', new_song_path, id: 'new_link', remote: true %>``  
	

* Notice that we've added the 'remote: true' to the new song link. This will make 
    the form submit an ajax request. It will *not* reload the page.


* Create a new.js.erb file with this contents.  
      `` $('#new_link').hide().after('<%= j render("form") %>')``

* A form is inserted into the page under the list of songs. How is done?

The javascript in the new.js.erb file is inserted into the page and run.

When you click the new song link:  
1. A HTTP Request is sent to Rails with the Accept HTTP Header set to 'application/javascript'.  
2. Rails knows that this kind of request, requesting javascript, will be handled by the new.js.erb file. This is a mapping between the Mime type _application/javascript_ and the new.js.erb file.  
3. ERB will process the code between the <%= %> and insert it. This is contents of the form partial.  
4. This content, javascript, sent back to the browser.  
5. Then the browser will run this javascript/jquery to insert the form _after_ the  element with the id of 'new_link'.
	




### Step Four

* Change the first line of the _form.html.erb to be.    
      `` <%= form_for(@song, :remote => true) do |f| %> ``

* Update the create action to respond to a javascript/ajax request.   

    ``def create``   
    `` ... ``  
    ``  format.js ``  
    ``   .. ``  
    ``end``  
    
* Add a create.js.erb file with the below contents.  n

    ``$('#new_task').remove();``  
    ``$('#new_link').show();``  
    ``$('#songs').append("<li>"+ "Name: <%=@song.name %>" + ", Duration(minutes): <%=@song.duration %>" + ", Price(dollars): <%=@song.price %>" + "</li>");``
    ``$('#new_song').hide();``   

* This will use jquery selectors to change the index page.

## Step Five

* Create a file show.js.erb with this contents.  
     ``<li><%=song.name%></li>``

* Goto http://localhost:3000/songs and create a new song.  
  Notice how there are *NO* page reloads when creating new songs. All 
   the creations are done via ajax and jquery.

## Resources


