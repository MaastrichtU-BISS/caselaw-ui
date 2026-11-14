<script lang="ts">
  import { BissFilePicker } from 'biss-ui/svelte';

  let status = $state('No file chosen');

  function pick([file]: File[]) {
    if (!file) return;
    status = file.type === 'application/pdf' ? `Ready to upload ${file.name}` : 'Choose a PDF file';
  }
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 22rem)">
  <BissFilePicker
    label="Upload signed consent form"
    hint="One PDF file."
    accept="application/pdf"
    multiple={false}
    onpick={pick}
  />
  <p role="status">{status}</p>
</div>
