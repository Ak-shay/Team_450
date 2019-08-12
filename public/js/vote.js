$(document).ready(function(){

    $('form').on('submit', function(){
       var voter_id = $('#voter_id').val();
       var candidate_id = $('select').find(':selected').val();
       var vote = {
            voter_id: voter_id,
            id: candidate_id
        };
       $.ajax({
           type: 'POST',
           url: '/vote',
           data: vote,
           success: function(data){
               location.reload();
           }
       });
    });

});