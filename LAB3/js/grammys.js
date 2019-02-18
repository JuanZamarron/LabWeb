$.ajax({
    url : "data/grammys.json",
    type : "GET",
    dataType : "json",
    success: function(data) {
      console.log(data)
      for(let i = 0; i < data.fields.length; i++) {
        var option = document.createElement('option')
        option.text = data.fields[i].field
        option.value = data.fields[i].field_id
        $('#category_types').append(option)
      }
      load(data, 1)
      $('#category_types').on('change', function(event) {
        let selectedId = this.value
        load(data, selectedId)
      })
      

    },
    error: function(error_msg) {
      console.log(error_msg);
    }
  })

function load(data, selectedId){
  
    $('#nominees_section').empty();
    $('#category_section').empty();

    
    for(let i = 0; i < data.fields.length; i++) {
        
        if (data.fields[i].field_id == selectedId){

          var category = document.createElement('h2')
          category.textContent = data.fields[i].field
          var catInfo = document.createElement('p')
          catInfo.textContent = data.fields[i].description
          catInfo.classList.add('description')

          $('#category_section').append(category)
          $('#category_section').append(catInfo)
          
          for (let j = 0; j < data.fields[i].categories.length; j++){

            var div = document.createElement('div')

            var nomineesUl = document.createElement('ul')

            for (let k = 0; k < data.fields[i].categories[j].nominees.length; k++){

              var nomineeLi = document.createElement('li')
              nomineeLi.textContent = data.fields[i].categories[j].nominees[k].nominee

              if (k == data.fields[i].categories[j].winner_id){

                nomineeLi.classList.add('winner')

                var newSpan = document.createElement('span')
                newSpan.textContent = 'WINNER!'
                nomineeLi.append(newSpan)

              }

              nomineesUl.append(nomineeLi)

              var newArtist = document.createElement('p')
              newArtist.textContent = data.fields[i].categories[j].nominees[k].artist
              nomineesUl.append(newArtist)

              var newInfo = document.createElement('p')
              newInfo.textContent = data.fields[i].categories[j].nominees[k].info
              nomineesUl.append(newInfo)

            }

            var newAward = document.createElement('h3')
            newAward.textContent = data.fields[i].categories[j].category_name

            var newAwardDesc = document.createElement('p')
            newAwardDesc.textContent = data.fields[i].categories[j].description
            newAwardDesc.classList.add('description')
            
            div.append(newAward)
            div.append(newAwardDesc)
            div.append(nomineesUl)
            div.classList.add('container')

            $('#nominees_section').append(div)
            $('#nominees_section').append(document.createElement('hr'))

          }
          
        }
    }

}