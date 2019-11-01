<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        
        @include('partials._head')

    </head>
    <body>

        <header>
            @include('partials._nav')
        </header>
        
        <!-- main container -->
        <main>
            <!-- .container -->
            <div class="container">
    
                @include('partials._messages')
                
                @yield('content')
    
            </div>
            <!-- /.container -->
        </main>
        <!-- /main container -->


        <!--Footer-->
        @include('partials._footer')
        <!--/.Footer-->

        <!-- SCRIPTS -->
        @include('partials._javascript')

    </body>
</html>