<script>
  var base_url = "{{ env('APP_URL') }}";
  var asset_url = "{{ asset('/') }}";
</script>
<script src="{{ asset('js/app.js') }}"></script>

@yield('scripts')