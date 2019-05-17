/*
    js 字符串操作函数
        我这里只是列举了常用的字符串函数，具体使用方法，请参考网址。
    concat() – 将两个或多个字符的文本组合起来，返回一个新的字符串。

    indexOf() – 返回字符串中一个子串第一处出现的索引。如果没有匹配项，返回 -1 。

    charAt() – 返回指定位置的字符。

    lastIndexOf() – 返回字符串中一个子串最后一处出现的索引，如果没有匹配项，返回 -1 。

    match() – 检查一个字符串是否匹配一个正则表达式。

    substr() 函数 -- 返回从string的startPos位置，长度为length的字符串

    substring() – 返回字符串的一个子串。传入参数是起始位置和结束位置。

    slice() – 提取字符串的一部分，并返回一个新字符串。

    replace() – 用来查找匹配一个正则表达式的字符串，然后使用新字符串代替匹配的字符串。

    search() – 执行一个正则表达式匹配查找。如果查找成功，返回字符串中匹配的索引值。否则返回 -1 。

    split() – 通过将字符串划分成子串，将一个字符串做成一个字符串数组。

    length – 返回字符串的长度，所谓字符串的长度是指其包含的字符的个数。

    toLowerCase() – 将整个字符串转成小写字母。

    toUpperCase() – 将整个字符串转成大写字母。
* */

//-efg
console.log('abcd-efg'.substring(4));
//bcd
console.log('abcd-efg'.substring(4, 1));
//-efg
console.log('abcd-efg'.substr(4));
//-
console.log('abcd-efg'.substr(4, 1));
//<sub>abcd-efg</sub>
console.log('abcd-efg'.sub());
