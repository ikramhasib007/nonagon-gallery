<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">

<title>
    @hasSection ('title')
        @yield('title') - Laravel Demo
    @else
        Laravel Demo
    @endif
</title>

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('css/app.css') }}">

@yield('stylesheets')