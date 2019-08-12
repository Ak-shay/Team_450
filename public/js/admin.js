$(document).ready(function(){

    $('tr').on('click', function(){
        var voter_id = $(this).children('#voter_id').text();
        $.ajax({
            type: 'POST',
            url: '/admin/voterverify/' + voter_id,
            data: {
                can_vote: true
            },
            success: function(data){
                location.reload()
            }
        });
    });

});