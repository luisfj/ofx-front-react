export type SseMessage = {
  status: 'SUCCESS' | 'FAIL';
  event: 'SSE_MESSAGE' | 'IMPORT_OFX' | 'PROCESS_OFX';
  title: string;
  message: string;
  eventDateTime: string;
  formatedEventDateTime: string;

}