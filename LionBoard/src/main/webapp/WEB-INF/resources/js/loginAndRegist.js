(function($) {
    "use strict";
	
	// Options for Message
	//----------------------------------------------
  var options = {
	  'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
	  'btn-success': '<i class="fa fa-check"></i>',
	  'btn-error': '<i class="fa fa-remove"></i>',
	  'msg-success': 'All Good! Redirecting...',
	  'msg-error': 'Wrong login credentials!',
	  'useAJAX': true,
  };

	// Login Form
	//----------------------------------------------
	// Validation
  //$("#login-form").validate({
  //	rules: {
  //    lg_username: "required",
  //	  lg_password: "required",
  //  },
  //	errorClass: "form-invalid"
  //});
  
	// Form Submission
  $("#login-form").submit(function() {
	  remove_loading($(this));

	  var account = {
		  email:$("input[name=email]").val(),
		  password:$("input[name=password]").val()
	  };


	  $.ajax({
		  url: '/login',
		  type: 'post',
		  data: account,
		  dataType: 'text',
		  success: function (data) {
			  console.log(data);

			  if(data == "ok") {
				  window.location.replace("/index");
			  }else{
				  alert(data);
				  return false;
			  }
		  },
		  error: function(data) {
			  console.log(data);
		  }
	  });

	  return false;

  });
	
	// Register Form
	//----------------------------------------------
	// Validation
  $("#register-form").validate({
  	rules: {
      username: "required",
  	  password: {
  			required: true,
  			minlength: 5
  		},
   		password_confirm: {
  			required: true,
  			minlength: 5,
  			equalTo: "#register-form [name=password]"
  		},
  		email: {
  	    required: true,
  			email: true
  		},
    },
	  errorClass: "form-invalid",
	  errorPlacement: function( label, element ) {
	    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
    		element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
	    }
			else {
  	  	label.insertAfter( element ); // standard behaviour
  	  }
    }
  });

  // Form Submission
  $("#register-form").submit(function() {
	  remove_loading($(this));

	  var user = {
		  identity:$("input[name=email]").val(),
		  roles:"U",
		  email:$("input[name=email]").val(),
		  password:$("input[name=password]").val(),
		  name:$("input[name=name]").val(),
		  profileUrl:"temp.url",
		  isOAuth:'F'
	  };


	  $.ajax({
		  url: '/users',
		  type: 'post',
		  data: user,
		  dataType: 'json',
		  success: function (data) {
			  window.location.replace("/login");
		  },
		  error: function(data) {

		  }
	  });

	  return false;

  });

	// Forgot Password Form
	//----------------------------------------------
	// Validation
  $("#forgot-password-form").validate({
  	rules: {
      fp_email: "required",
    },
  	errorClass: "form-invalid"
  });
  
	// Form Submission
  $("#forgot-password-form").submit(function() {
  	remove_loading($(this));
		
		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));
		
		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Loading
	//----------------------------------------------
  function remove_loading($form)
  {
  	$form.find('[type=submit]').removeClass('error success');
  	$form.find('.login-form-main-message').removeClass('show error success').html('');
  }

  function form_loading($form)
  {
    $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
  }
  
  function form_success($form)
  {
	  $form.find('[type=submit]').addClass('success').html(options['btn-success']);
	  $form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
  }

  function form_failed($form)
  {
  	$form.find('[type=submit]').addClass('error').html(options['btn-error']);
  	$form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
  }

	// Dummy Submit Form (Remove this)
	//----------------------------------------------
	// This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.
  function dummy_submit_form($form)
  {


  	if($form.valid())
  	{
  		form_loading($form);
  		
  		setTimeout(function() {
  			form_success($form);
  		}, 2000);
  	}
  }
	
})(jQuery);