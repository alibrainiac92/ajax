 	$(document).ready(function(){
            $('#addMovie-form').on('submit',function(e){
                e.preventDefault();
                var movie = $('input').val();
                getMovie(movie);
                
            });
            function getMovie(movie){
                $.ajax({
                    url:"http://www.omdbapi.com/?t=" + movie,
                    type: "GET",
                    crossDomain: true,    // used to prevent cross domain issues
                    //dataType: 'jsonp', 
                    success:function(data){
                        updateLS(data);
                        addNewMovie(data);
                        console.log(data);
                       
                    },

                    error:function(error){
                        console.log(error);
                    }
                });
            }

            function updateLS(movie){
                var m = JSON.parse(localStorage.getItem('movies'));
                if (!m){
                    m = [];
                }
                m.push(movie);
                localStorage.setItem('movies', JSON.stringify(m));
            }

            function addNewMovie(data){
                $("#bodylist").append("<div class= 'movieWrap'>" + 
                    "<p id= 'p01'>" + 
                    "<span class='title'>" + 
                    "Title: " + "</span>" + data.Title + "</p><p id= 'p02'>" + 
                    "<span class='genre'>" + "Genre: " + "</span>" + data.Genre + "</p><p id= 'p03'>" + 
                    "<span class='rated'>" + "Rated: " + "</span>" + data.Rated + "</p><p id= 'p04'>"+ 
                    "<span class='year'>" + "Year: " + "</span>" + data.Year + "</p><p id= 'p05'>"+ 
                    "<span class='runtime'>" + "Runtime: " + "</span>" + data.Runtime + "</p><p id= 'p06'>"+ 
                    "<span class='plot'>" + "Plot: " + "</span>" + data.Plot+"</p>" + "</div>");
            }

            var history = JSON.parse(localStorage.getItem('movies'));
            if (history.length > 0){
                console.log("add movies to screen");
                console.log(history);
                $.each(history, function(key, val){
                    addNewMovie(val);
                });
            }

          //  function delete(){
            //}

            //add delete function for when accidentally add movies-- click function
        });
        


        $(function() { 
            $('#navbar-default li').each(function() { 
                if ($(this).children('a').attr('href') == window.location.pathname)
                {
                    $(this).addClass('active');
                }
            });
        });

//function to check to see when each <a> is active and if true it styles it a specific way