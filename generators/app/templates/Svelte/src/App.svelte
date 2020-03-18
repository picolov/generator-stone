<script>
  let input01 = "hasilku";
  function handleClick(event) {
    console.log("---->", event.target.value);
    input01 = event.target.value;
  }
</script>

<style>

</style>

<svelte:head>
  <script type="module">
    import "https://unpkg.com/@ui5/webcomponents/dist/Label?module";
    import "https://unpkg.com/@ui5/webcomponents/dist/Input?module";
    import "https://unpkg.com/@ui5/webcomponents/dist/Button?module";
  </script>
</svelte:head>

<ui5-label>{input01}</ui5-label>
<ui5-input value={input01} on:input={handleClick} />
<ui5-button>{input01}</ui5-button>
