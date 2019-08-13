$(document).ready(function(){
    $('form').on('submit', function(){
        var name = $('#name').val();
        var age = $('#age').val();
        var adhaar = $('#adhaar').val();
        var voter_id = ('#voter_id').val();
        var data = {
            name: name,
            voter_id: voter_id,
            adhaar: adhaar,
            age: age
        };
        $.ajax({
            type: 'POST',
            url: '/candidate',
            data: data,
            success: function(data){
                console.log(data);
                location.reload();
            }
        });
    });
});