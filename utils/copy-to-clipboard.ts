export default function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}
