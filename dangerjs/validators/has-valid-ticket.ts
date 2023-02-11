// SS Ticket format: https://xploregroup.atlassian.net/browse/CAA-87
// Casa Support Ticket format: https://incentro.atlassian.net/browse/CASA-228
const ticketRegExp = /^Ticket: ([\w]+-[0-9]+)$/im;
const markdownSSTicketRegExp =
  /^Ticket: \[([\w]+-[0-9]+)\]\((https:\/\/xploregroup\.atlassian\.net\/browse)\/\1\)$/im;
const markdownCasaSupportTicketRegExp =
  /^Ticket: \[([\w]+-[0-9]+)\]\((https:\/\/incentro\.atlassian\.net\/browse)\/\1\)$/im;
const explicitNoTicket = /^Ticket: None$/im;

export const hasValidTicketFooter = (body: string) =>
  ticketRegExp.test(body) ||
  markdownSSTicketRegExp.test(body) ||
  markdownCasaSupportTicketRegExp.test(body) ||
  explicitNoTicket.test(body);
