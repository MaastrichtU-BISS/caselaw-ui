<script lang="ts">
  import { BissAttachmentList, BissFilePicker, type BissAttachment } from 'biss-ui/svelte';

  let files = $state<BissAttachment[]>([
    { id: 'budget', name: 'Budget justification.xlsx', size: '48 KB', removable: true },
  ]);

  function add(picked: File[]) {
    files = [
      ...files,
      ...picked.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: `${Math.ceil(file.size / 1024)} KB`,
        removable: true,
      })),
    ];
  }
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)">
  <BissFilePicker
    label="Add supporting documents"
    hint="PDF, Word or Excel, up to 20 MB each."
    onpick={add}
  />
  <BissAttachmentList
    items={files}
    onremove={(id) => (files = files.filter((file) => file.id !== id))}
  />
</div>
