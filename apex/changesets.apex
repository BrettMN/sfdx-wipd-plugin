PageReference pr=new PageReference('/changemgmt/listOutboundChangeSet.apexp');
Blob output=pr.getContent();
System.debug('### Content = \n' + output.toString());