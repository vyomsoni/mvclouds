/**
*
* @description Class contains methods for converting html to plain text
*
*
* @author Andrii Muzychuk
* @date 12/23/2014
*
*/
global class HtmlToPlainTextConverter {

    private static String anyOpenHtmlTag = '<\\W{0,1}\\w+\\s*\\w*>';
  
    // array is used to store order of patters
    private static String [] patternsApplyOrder = new String [] {
      '</td>',
      '</\\w+>',
      '</[h||H][0-9]{0,1}>',
  
      '<tr\\s*(valign=".{1,20}")*\\s*>',
      '<td\\s+colspan="[0-9]"\\s*>(\\s*||&nbsp;)\\s*</td>',
      '<td\\s*(style=".{1,40}")*\\s*>(\\s*||&nbsp;)\\s*</td>',
  
      anyOpenHtmlTag
    };
  
    private static Map<String, String> convertPatterns = new Map<String, String> {
      '</td>' => ' ',
      '</\\w+>' => '\n', // any closing tag convert to new line
      '</[h||H][0-9]{0,1}>' => '\n',
  
      '<tr\\s*(valign=".{1,20}")*\\s*>' => '\n',
      '<td\\s+colspan="[0-9]"\\s*>(\\s*||&nbsp;)\\s*</td>' => '\n --- \n',
      '<td\\s*(style=".{1,40}")*\\s*>(\\s*||&nbsp;)\\s*</td>' => '\t',
  
      anyOpenHtmlTag => ''
    };
  
    /**
    *
    * @description Method removes html tags or replaces them with line break
    *
    * @param htmlToConvert
    *
    *
    * @usage HtmlToPlainTextConverter.convert(htmlToConvert);
    *
    * @author Andrii Muzychuk
    * @date 12/23/2014
    *
    */
    global static String convert(String htmlToConvert) {
      String plainText = htmlToConvert;
  
      for (String convertPatternKey : patternsApplyOrder) {
          plainText = plainText.replaceAll(convertPatternKey, convertPatterns.get(convertPatternKey));
      }
  
      return plainText.trim();
    }
  
  }