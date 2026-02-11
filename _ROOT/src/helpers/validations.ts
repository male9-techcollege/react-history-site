/* Source of library helper functions (utility functions), incl. course notes:
react-gallery-wrapper
*/

/* Goal: validation for a password of a minimum number of characters,
with at least one digit and at least 1 special character 

As the following source shows,
    \d+
or
    [0-9]+
simply means "one or more digit (i.e. at least one) digit"
Within starting and closing forward slashes, which are NOT part of the regex:
    /\d+/
    /[0-9]+/

According to a tutorial of the University of Singapore:
"Character class (or Bracket List): (...)
[^...]" accepts "NOT ONE of the character, e.g., [^0-9] matches any non-digit. (...)
Occurrence Indicators (or Repetition Operators):
+: one or more (1+), e.g., [0-9]+ matches one or more digits such as '123', '000'. (...)
{m,n}: m to n (both inclusive) (...)
{m,}: m or more (m+)
Meta-characters: matches a character (...)
\d, \D: ANY ONE digit/non-digit character. Digits are [0-9] (...)
Position Anchors: does not match character, but position such as start-of-line, end-of-line, start-of-word and end-of-word.
^, $: start-of-line and end-of-line respectively. E.g., ^[0-9]$ matches a numeric string. (...)
In JavaScript (and Perl), a regex is delimited by a pair of forward slashes, in the form of /.../."
https://personal.ntu.edu.sg/ehchua/programming/howto/Regexe.html
Note: "^[0-9]$ matches a numeric string"
means that only the characters in the bracket list are accepted within the entire value/input to evaluate.
Indeed, the list in the bracket list is exhaustive. Nothing else is accepted in that portion of a regex.
Letters and special characters are thereby forbidden.

Hopefully, I understand the following right. The global modifier doesn't do anything useful in the current context,
but the regular expression used in class in GF2 contained it, so I wanted to know what it did.
The global modifier (global flag, i.e. the letter g placed after the closing forward slash) is necessary 
to find several substrings of a certain type in a string. 
If the global modifier is absent, the function (e.g. test()) stops looking after finding the first match.
When the global modifier is present, the function continues to look after finding the first match. 
"A regex may match a portion of the input (i.e., substring) or the entire input. In fact, it could match 
zero or more substrings of the input (with global modifier)."
https://personal.ntu.edu.sg/ehchua/programming/howto/Regexe.html

The following are my own regular expressions (regexes). 
The following says that there must be at least one character that is
neither a letter nor a digit (i.e. a special character).
    [^A-Za-z0-9]+
Within starting and closing forward slashes, which are NOT part of the regex:
    /[^A-Za-z0-9]+/
The following gives a list of accepted special characters. It contains characters with special meaning in a
bracket list, which must be preceded by an escape character to have a literal meaning: \  
    [ °\-=!#%?&*()_+¬@¹²³¼½¾{[<>\]}|§¶€¢$¥~;:þßðªµ´`\^¨¸,.'\\"«»/]+
Within starting and closing forward slashes, which are NOT part of the regex:
    /[ °\-=!#%?&*()_+¬@¹²³¼½¾{[<>\]}|§¶€¢$¥~;:þßðªµ´`\^¨¸,.'\\"«»/]+/

I considered performing a single test on a regular expression that contained all evaluation criteria. 
This could be done with the OR operator ( | ), for instance like this:
    [0-9]+[ °\-=!#%?&*()_+¬@¹²³¼½¾{[<>\]}|§¶€¢$¥~;:þßðªµ´`\^¨¸,.'\\"«»/]+|[ °\-=!#%?&*()_+¬@¹²³¼½¾{[<>\]}|§¶€¢$¥~;:þßðªµ´`\^¨¸,.'\\"«»/]+[0-9]+
Since the password's mandatory digit can come before or after the mandatory special character, and
since the sequence of substrings in a regex matters, the OR operator needs to be used to avoid requiring
a digit to come before a special character or vice versa!
It might be possible to create a single regex for all the validation requirements in this execise, but 
that regex would get really complicated and contain quite a few OR operators since there are many potential combinations 
of letters, numbers and special characters in up to 15 characters. 
*/
export const specialCharTestByMariePierreLessard = (entry: string) => {
    const specialCharPresentByMariePierreLessard = /[^A-Za-z0-9]+/;
    return specialCharPresentByMariePierreLessard.test(entry);
};

export const digitTestByMariePierreLessard = (entry: string) => {
    const digitPresentByMariePierreLessard = /\d+/;
    return digitPresentByMariePierreLessard.test(entry);
};

export const validatePhoneNoByMariePierreLessard = (entry: string) => {
    /* Regex created in GF2 thanks to instructions at https://personal.ntu.edu.sg/ehchua/programming/howto/Regexe.html 
    If I remove the length range, the regex no longer works (i.e it does not do what I want). */
    const validPhoneNoByMariePierreLessard = /^[0-9 ()\-+]{8,14}$/;
    return validPhoneNoByMariePierreLessard.test(entry);
};

/* Source of regular expression that closely complies to the RFC 5322 standard: https://www.mailercheck.com/articles/email-validation-javascript 
I added æÆøØåÅ to it, added an escape character in front of the - inside of bracket lists 
and changed the length of the top-level domain part.
Indeed, the range {2,40} is not for the whole email address. It's just for the top-level domain part (e.g. .dk),
as explained in the MailerCheck article. 
"2.5  Bracket List (Character Class) [...], [^...], [.-.]
A bracket expression is a list of characters enclosed by [ ], also called character class. (...)
To include a - place it last, or use escape \-."
https://personal.ntu.edu.sg/ehchua/programming/howto/Regexe.html
*/
export const validateEmailByMariePierreLessard = (email: string) => {
    const validEmailByMariePierreLessard = /^[a-zA-ZæÆøØåÅ0-9._%+\-]+@[a-zA-ZæÆøØåÅ0-9.\-]+\.[a-zA-ZæÆøØåÅ]{2,40}$/;
    return validEmailByMariePierreLessard.test(email);
};

export const validateMsgByMariePierreLessard = (msg: string)=> {
    /* Regex created in GF2 thanks to instructions at https://personal.ntu.edu.sg/ehchua/programming/howto/Regexe.html
    If I remove the length range, the regex no longer works (i.e it does not do what I want). */
    const validMsgByMariePierreLessard = /^[a-zA-ZæÆøØåÅ0-9"()\-:;.,!?%@ \t\n]{10,400}$/;
    return validMsgByMariePierreLessard.test(msg);
};
