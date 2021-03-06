(function ($) {
    $("#edit-form").submit(function () {
        sendFileForm();

        return false;
    });

    $('.delete-file').click(function () {
        var fileId = $(this).data('fileid');
        if (confirm("해당 첨부파일을 삭제하고 저장합니다.") == true) {

            //파일을 삭제하고 정상적으로 처리되었으면, 현재 수정된 내용을 저장하는 로직을 수행함.
            $.ajax({
                url: '/files/' + fileId,
                type: 'delete',
                dataType: 'text',
                success: function (responsedData) {
                    if (responsedData == 'success') {
                        sendFileForm();
                    } else {
                        alert(responsedData);
                    }
                }
            });
        } else {
            return;
        }
    });


    function sendFileForm() {
        var postId = $("input[name=postId]").val();
        if ($("input[name=uploadFile]")[0].files[0] != null) {
            var formData = new FormData();
            formData.append("postId", postId);
            //첨부된 파일이 있을때만 formdata객체에 파일 속성을 생성함.
            formData.append("uploadFile", $("input[name=uploadFile]")[0].files[0]);
            console.log(formData);
            $.ajax({
                url: '/files',
                type: 'post',
                data: formData,
                cache: false,
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request,
                dataType: 'text',
                success: function (responsedData) {
                    if (responsedData == "success") {
                        //var postId =$("input[name=postId]").val();
                        var postInfo = {
                            title: $("input[name=title]").val(),
                            contents: $('#summernote').summernote('code'),
                            postId: postId,
                            userId: $("input[name=userId]").val(),
                            existFiles: 'T'
                        };
                        $.ajax({
                            url: '/posts/' + postId,
                            type: 'put',
                            data: JSON.stringify(postInfo),
                            contentType: "application/json; charset=UTF-8",
                            dataType: 'text',
                            success: function (postId) {
                                window.location.replace("/posts/" + postId);
                            }
                        });
                    } else {
                        alert(responsedData);
                    }
                }
            });
        } else {
            //var postId =$("input[name=postId]").val();
            var postInfo = {
                title: $("input[name=title]").val(),
                contents: $('#summernote').summernote('code'),
                postId: postId,
                userId: $("input[name=userId]").val(),
                existFiles: 'F'
            };

            console.log(postInfo);
            $.ajax({
                url: '/posts/' + postId,
                type: 'put',
                data: JSON.stringify(postInfo),
                contentType: "application/json; charset=UTF-8",
                dataType: 'text',
                success: function (postId) {
                    window.location.replace("/posts/" + postId);
                }
            });
        }

    }

})(jQuery);