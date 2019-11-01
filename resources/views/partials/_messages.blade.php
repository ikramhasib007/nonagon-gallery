@if (Session::has('success'))
	<div class="alert alert-success" role="alert">
		<p class="m-0"><strong>Success: </strong>{{ Session::get('success') }}</p>
	</div>
@endif

{{-- {{ $errors->all() }} --}}


@if (count($errors) > 0)
	<div class="alert alert-danger" role="alert">
		<ul>
		<strong>Errors: </strong>
		@foreach ($errors->all() as $error)
			<li><p class="m-0">{{ $error }}</p></li>
		@endforeach
		</ul>
	</div>
@endif

