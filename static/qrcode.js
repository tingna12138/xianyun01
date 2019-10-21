/ **
* @fileoverview
 *-使用“ QRCode for Javascript库”
 *-修复了“ Java库的QRCode”数据集，以支持完整规范。
 *-此库没有依赖项。
 * 
* @作者 davidshimjs
* @see  <a href="http://www.d-project.com/" target="_blank"> http://www.d-project.com/ </a>
* @see  <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank"> http://jeromeetienne.github.com/jquery-qrcode/ </a>
 * /
var QRCode;

（函数（）{
	// ------------------------------------------------ ---------------------
	// JavaScript的QRCode
	//
	//版权所有（c）2009 Kazuhiko Arase
	//
	//网址：http：//www.d-project.com/
	//
	//根据MIT许可获得许可：
	//    http://www.opensource.org/licenses/mit-license.php
	//
	//单词“ QR Code”是的注册商标
	// DENSO WAVE公司成立
	//    http://www.denso-wave.com/qrcode/faqpatent-e.html
	//
	// ------------------------------------------------ ---------------------
	函数 QR8bitByte（数据）{
		这个。模式 =  QRMode。MODE_8BIT_BYTE ;
		这个。数据 =数据;
		这个。parsedData  = [];

		//添加以支持UTF-8字符
		为（VAR我=  0，L =  此。数据。长度 ;我<升;我++）{
			var byteArray = [];
			var code =  this。数据。charCodeAt（i）;

			如果（代码>  0x10000）{
				byteArray [ 0 ] =  0xF0  | （（代码＆ 0x1C0000）>>>  18）;
				byteArray [ 1 ] =  0x80  | （（代码＆ 0x3F000）>>>  12）;
				byteArray [ 2 ] =  0x80  | （（代码＆ 0xFC0）>>>  6）;
				byteArray [ 3 ] =  0x80  | （代码＆ 0x3F）;
			} else  if（code >  0x800）{
				byteArray [ 0 ] =  0xE0  | （（代码＆ 0xF000）>>>  12）;
				byteArray [ 1 ] =  0x80  | （（代码＆ 0xFC0）>>>  6）;
				byteArray [ 2 ] =  0x80  | （代码＆ 0x3F）;
			} else  if（code >  0x80）{
				byteArray [ 0 ] =  0xC0  | （（代码＆ 0x7C0）>>>  6）;
				byteArray [ 1 ] =  0x80  | （代码＆ 0x3F）;
			} 其他 {
				byteArray [ 0 ] =代码；
			}

			这个。parsedData。推（byteArray）;
		}

		这个。parsedData  =  Array。原型。concat。申请（[]，此。parsedData）;

		如果（此。parsedData。长度 ！=  此。数据。长度）{
			这个。parsedData。换挡（191）;
			这个。parsedData。不变（187）;
			这个。parsedData。换档（239）;
		}
	}

	QR8bitByte。原型 = {
		getLength ： 函数（缓冲区）{
			返回 这个。parsedData。长度 ;
		}，
		写： 函数（缓冲区）{
			为（VAR我=  0，L =  此。parsedData。长度 ;我<升;我++）{
				缓冲。放（这。parsedData [I]，8）;
			}
		}
	};

	函数 QRCodeModel（typeNumber，errorCorrectLevel）{
		这个。typeNumber  = typeNumber;
		这个。errorCorrectLevel  = errorCorrectLevel;
		这个。modules  =  null ;
		这个。moduleCount  =  0 ;
		这个。dataCache  =  null ;
		这个。dataList  = [];
	}

	QRCodeModel。原型= { addData ：函数（数据）{ var newData = 新的 QR8bitByte（数据）; 这个。dataList。推送（newData）; 这个。数据高速缓存= 空 ;}，isDark ：功能（行，COL）{ 如果（行< 0 || 此。moduleCount <=行||山口< 0|| 这个。moduleCount <= col）{ 抛出 新 错误（row + “，” + col）;}
	返回 这个。modules [row] [col];}，getModuleCount ：function（）{ 返回 this。moduleCount ;}，make ：function（）{ this。makeImpl（假，此。getBestMaskPattern（））;}，makeImpl ：功能（测试，maskPattern）{ 此。moduleCount = this。typeNumber * 4 + 17 ;这个。模块= 新 阵列（此。moduleCount）; 为（VAR行= 0 ;排< 此。moduleCount ;行++）{ 此。模块 [行] = 新 阵列（此。moduleCount）; 为（VAR COL = 0 ; COL < 此。moduleCount ; COL ++）{ 本。模块 [row] [col] = null ;}}
	这个。setupPositionProbePattern（0，0）; 这个。setupPositionProbePattern（此。moduleCount - 7，0）; 这个。setupPositionProbePattern（0，此。moduleCount - 7）; 这个。setupPositionAdjustPattern（）; 这个。setupTimingPattern（）; 这个。setupTypeInfo（test，maskPattern）; 如果（这个。typeNumber > = 7）{ this。setupTypeNumber（测试）；}
	如果（这个。数据高速缓存== 空）{ 此。dataCache = QRCodeModel。createData（此。typeNumber，此。errorCorrectLevel，此。数据列表）;}
	这个。属于MapData（此。数据高速缓存，maskPattern）;}，setupPositionProbePattern ：功能（行，COL）{ 对于（VAR - [R = - 1 ; R <= 7 ; R ++）{ 如果（行+ - [R <= - 1 || 这。moduleCount <=行+ r）的继续 ; 为（VAR Ç = - 1;ç <= 7 ; C ^ ++）{ 如果（COL + ç <= - 1 || 此。moduleCount <= COL + c）中继续 ; if（（0 <= r && r <= 6 &&（c == 0 || c == 6））||（0 <= c && c <= 6 &&（r == 0 || r ==6））|| （2 <= r && r <= 4 && 2 <= c && c <= 4））{ 此。模块 [row + r] [col + c] = true ;} 其他 { this。模块 [row + r] [col + c] = false ;}}}}，getBestMaskPattern ：function（）{ var minLostPoint = 0 ;var pattern = 0 ; 对于（var i = 0 ; i < 8 ; i ++）{ this。makeImpl（true，i）; var lostPoint = QRUtil。getLostPoint（this）; if（i == 0 || minLostPoint > lostPoint）{minLostPoint = lostPoint; pattern = i;}}
	返回模式；}，createMovieClip ：函数（target_mc，instance_name，depth）{ var qr_mc = target_mc。createEmptyMovieClip（instance_name，depth）; var cs = 1 ; 这个。make（）; 为（VAR行= 0 ;排< 此。模块。长度 ;行++）{ VAR Ŷ =行*cs; 为（VAR COL = 0 ; COL < 此。模块 [行]。长度 ; COL ++）{ VAR X =关口* CS; var dark = this。模块 [row] [col]; if（dark）{ qr_mc。的beginFill（0，100）; qr_mc。moveTo（x，y）; qr_mc。lineTo（x + cs，y）; qr_mc。lineTo（x + cs，y + cs）; qr_mc。lineTo（x，y + cs）; qr_mc。endFill（）;}}}
	返回 qr_mc;}，setupTimingPattern ：函数（）{ 对于（VAR - [R = 8 ; R < 此。moduleCount - 8 ; R ++）{ 如果（此。模块 [R] [ 6 ] ！= 空）{ 继续 ;}
	这个。模块 [r] [ 6 ] =（r ％2 == 0）;}
	为（VAR ç = 8 ;ç < 此。moduleCount - 8 ; C ^ ++）{ 如果（此。模块 [ 6 ] [C] ！= 空）{ 继续 ;}
	这个。模块 [ 6 ] [c] =（c ％2 == 0）;}}，setupPositionAdjustPattern ：function（）{ var pos = QRUtil。getPatternPosition（此。typeNumber）; 为（VAR我= 0 ;我< POS。长度 ;我++）{ 对于（VAR Ĵ = 0 ;Ĵ < POS。长度； j ++）{ var row = pos [i]; var col = pos [j]; 如果（此。模块 [行] [山口] =！空）{ 继续 ;}
	为（VAR - [R = - 2 ; R <= 2 ; R ++）{ 对于（VAR Ç = - 2 ;ç <= 2 ; C ^ ++）{ 如果（R == - 2 || - [R == 2 | | c == - 2 || c == 2 ||（r == 0 && c == 0））{ 此。模块 [行+r] [col + c] = true ;} 其他 { this。modules [row + r] [col + c] = false ;}}}}}}，setupTypeNumber ：function（test）{ var bits = QRUtil。getBCHTypeNumber（此。typeNumber）; 对于（var i = 0 ; i < 18 ; i ++）{ var mod =（！测试&&（（bits >> i）＆1）== 1）; 这个。模块 [ 数学。楼（i / 3）] [i ％3 + this。moduleCount - 8 - 3 ] = MOD;}
	对于（var i = 0 ; i < 18 ; i ++）{ var mod =（！ test &&（（bits >> i）＆1）== 1）; 这个。模组 [i ％3 + this。moduleCount - 8 - 3 ] [ 数学式。floor（i / 3）] = mod;}}，setupTypeInfo ：function（试验，maskPattern）{ VAR数据=（此。errorCorrectLevel << 3）| maskPattern; var bits = QRUtil。getBCHTypeInfo（数据）; 对于（var i = 0 ; i < 15 ; i ++）{ var mod =（！ test &&（（bits >> i）＆1）== 1）; 如果（i < 6）{ 此。模块 [I] [ 8 ] = MOD;} 否则 如果（I < 8）{ 此。模块 [i + 1 ] [ 8 ] = mod;} 其他 { this。模块 [ this。moduleCount - 15 + i] [ 8 ] = mod;}}
	对于（var i = 0 ; i < 15 ; i ++）{ var mod =（！ test &&（（bits >> i）＆1）== 1）; 如果（i < 8）{ 这个。模块 [ 8 ] [ 此。moduleCount -我- 1 ] = MOD;} 否则 如果（I < 9）{ 此。模块 [ 8 ] [ 15 - i - 1 + 1 ] = mod;} 其他 { this。模块 [ 8 ] [ 15 - i - 1 ] = mod;}}
	这个。模块 [ this。moduleCount - 8 ] [ 8 ] =（！试验）;}，属于MapData ：功能（数据，maskPattern）{ VAR INC = - 1 ; var row = this。moduleCount - 1 ; var bitIndex = 7 ; var byteIndex = 0 ; 为（var col= 这个。moduleCount - 1 ; COL > 0 ; COL - = 2）{ 如果（COL == 6）山口- ; 而（真）{ 对于（VAR ç = 0 ; c ^ < 2 ; C ^ ++）{ 如果（此。模块 [行] [COL - C] == 空）{ VAR暗= 假 ; 如果（byteIndex< 数据。长度）{dark =（（（（data [byteIndex] >>> bitIndex）＆1）== 1）;}
	var mask = QRUtil。getMask（maskPattern，row，col - c）; 如果（mask）{dark = ！暗;}
	这个。模块 [行] [COL - C] =暗; bitIndex处- ; if（bitIndex == - 1）{byteIndex ++ ; bitIndex = 7 ;}}}
	行+ = inc; 如果（行< 0 || 此。moduleCount <=行）{行- = INC; INC = - INC; 打破 ;}}}}}; QRCodeModel。PAD0 = 0xEC ; QRCodeModel。PAD1 = 0x11 ; QRCodeModel。createData = 函数（typeNumber，errorCorrectLevel，dataList）{ var rsBlocks = QRRSBlock。getRSBlocks（typeNumber，errorCorrectLevel）; var buffer = new  QRBitBuffer（）; 为（VAR我= 0 ;我< 数据列表。长度 ;我++）{ VAR数据=数据列表[I]; 缓冲。put（数据。模式，4）; 缓冲。把（数据。的getLength（），QRUtil。getLengthInBits（数据。模式，typeNumber））; 数据。写（缓冲区）；}
	var totalDataCount = 0 ; 为（VAR我= 0 ;我< rsBlocks。长度 ;我++）{totalDataCount + = rsBlocks [i]中。dataCount ;}
	如果（缓冲器。getLengthInBits（）> totalDataCount * 8）{ 抛出 新 错误（“代码长度溢出。（ ”
	+ 缓冲区。getLengthInBits（）
	+ “ > ”
	+ totalDataCount * 8
	+ “）”）;}
	如果（缓冲器。getLengthInBits（）+ 4 <= totalDataCount * 8）{ 缓冲器。放（0，4）;}
	而（缓冲器。getLengthInBits（） ％8 ！= 0）{ 缓冲器。putBit（false）;}
	而（真）{ 如果（缓冲器。getLengthInBits（）> = totalDataCount * 8）{ 断裂 ;}
	缓冲。放（QRCodeModel。PAD0，8）; 如果（缓冲器。getLengthInBits（）> = totalDataCount * 8）{ 断裂 ;}
	缓冲。放（QRCodeModel。PAD1，8）;}
	返回 QRCodeModel。createBytes（buffer，rsBlocks）;}; QRCodeModel。createBytes = 函数（缓冲区，rsBlocks）{ var offset = 0 ; var maxDcCount = 0 ; var maxEcCount = 0 ; VAR dcdata = 新 阵列（rsBlocks。长度）; VAR ecdata = 新 阵列（rsBlocks。长度）; 为（VAR - [R = 0 ; R < rsBlocks。长度 ; R ++）{ VAR dcCount = rsBlocks [R]。dataCount ; var ecCount = rsBlocks [r]。totalCount - dcCount; maxDcCount = 数学。max（maxDcCount，dcCount）; maxEcCount = Math。max（maxEcCount，ecCount）; dcdata [r] = 新 数组（dcCount）; 对于（var i = 0; i < dcdata [r]。长度； i ++）{dcdata [r] [i] = 0xff ＆buffer。缓冲区 [i +偏移量];}
	偏移量+ = dcCount; var rsPoly = QRUtil。getErrorCorrectPolynomial（ecCount）; VAR rawPoly = 新 QRPolynomial（dcdata [R]，rsPoly。的getLength（）- 1）; var modPoly = rawPoly。MOD（rsPoly）; ecdata [R] = 新 阵列（rsPoly。的getLength（）- 1）; 对于（var i = 0 ; i <ecdata [r]。长度； i ++）{ var modIndex = i + modPoly。getLength（）- ecdata [r]。长度 ; ecdata [r] [i] =（modIndex > = 0）？modPoly。get（modIndex）：0 ;}}
	var totalCodeCount = 0 ; 为（VAR我= 0 ;我< rsBlocks。长度 ;我++）{totalCodeCount + = rsBlocks [i]中。totalCount ;}
	var data = new  Array（totalCodeCount）; var index = 0 ; 为（VAR我= 0 ;我< maxDcCount;我++）{ 对于（VAR - [R = 0 ; R < rsBlocks。长度 ; R ++）{ 如果（ⅰ <。dcdata [R] 长度）{数据[指数+ + ] = dcdata [r] [i];}}}
	为（VAR我= 0 ;我< maxEcCount;我++）{ 对于（VAR - [R = 0 ; R < rsBlocks。长度 ; R ++）{ 如果（ⅰ <。ecdata [R] 长度）{数据[指数+ + ] = ecdata [r] [i];}}}
	返回数据;}; var QRMode = {MODE_NUMBER：1 << 0，MODE_ALPHA_NUM：1 << 1，MODE_8BIT_BYTE：1 << 2，MODE_KANJI：1 << 3}; var QRErrorCorrectLevel = {L：1，M：0， Q：3，H：2}; var QRMaskPattern = {PATTERN000：0，PATTERN001：1，PATTERN010：2，PATTERN011：3，PATTERN100：4，PATTERN101：5，PATTERN110：6，PATTERN111：7}; var QRUtil = { PATTERN_POSITION_TABLE：[[]，[6,18]，[6,22]，[6,26]，[6,30]，[6,34]，[6,22,38]，[6,24,42 ]，[6,26,46]，[6,28,50]，[6,30,54]，[6,32,58]，[6,34,62]，[6,26,46,66 ]，[6,26,48,70]，[6,26,50,74]，[6,30,54,78]，[6,30,56,82]，[6,30,58,86 ]，[6,34,62,90]，[6,28,50,72,94]，[6,26,50,74,98]，[6,30,54,78,102]，[6,28 ，54,80,106]，[6,32,58,84,110]，[6,30,58,86,114]，[6,34,62,90,118]，[6,26,50,74,98,122]，[6 ，30,54,78,102,126]，[6,26,52,78,104,130]，[6,30,56,82,108,134]，[6,34,60,86,112,138]，[6,30,58,86,114,142]，[6 ，34,62,90,118,146]，[6,30,54,78,102,126,150]，[6,24,50,76,102,128,154]，[6,28,54,80,106,132，158]，[6,32,58,84,110,136,162]，[6,26,54,82,110,138,166]，[6,30,58,86,114,142,170]]，G15：（1 << 10）|（1 << 8）| （1 << 5）|（1 << 4）|（1 << 2）|（1 << 1）|（1 << 0），G18：（1 << 12）|（1 << 11） |（1 << 10）|（1 << 9）|（1 << 8）|（1 << 5）|（1 << 2）|（1 << 0），G15_MASK：（1 << 14 ）|（1 << 12）|（1 << 10）|（1 << 4）|（1 << 1），getBCHTypeInfo：function（data）{var d = data << 10; while（QRUtil.getBCHDigit （d）-QRUtil.getBCHDigit（QRUtil.G15）> = 0）{d ^ =（QRUtil.G15 <<（QRUtil.getBCHDigit（d）-QRUtil.getBCHDigit（QRUtil.G15）））}}（1 << 14）|（1 << 12）|（1 << 10）|（1 << 4）|（1 << 1），getBCHTypeInfo：function（data）{var d = data << 10;而（QRUtil.getBCHDigit（d）-QRUtil.getBCHDigit（QRUtil.G15）> = 0）{d ^ =（QRUtil.G15 <<（QRUtil.getBCHDigit（d）-QRUtil.getBCHDigit（QRUtil.G15））））;; }（1 << 14）|（1 << 12）|（1 << 10）|（1 << 4）|（1 << 1），getBCHTypeInfo：function（data）{var d = data << 10;而（QRUtil.getBCHDigit（d）-QRUtil.getBCHDigit（QRUtil.G15）> = 0）{d ^ =（QRUtil.G15 <<（QRUtil.getBCHDigit（d）-QRUtil.getBCHDigit（QRUtil.G15））））;; }
	返回（（数据<< 10）| d）^ QRUtil。G15_MASK ;}，getBCHTypeNumber ：函数（数据）{ var d =数据<< 12 ; 而（QRUtil。getBCHDigit（d）- QRUtil。getBCHDigit（QRUtil。G18）> = 0）{d ^ =（QRUtil。G18 <<（QRUtil。getBCHDigit（d）- QRUtil。getBCHDigit（QRUtil。G18）））;}
	返回（数据<< 12）| d;}，getBCHDigit ：函数（数据）{ var digit = 0 ; while（data ！= 0）{digit ++ ; data >>> = 1 ;}
	return digit;}，getPatternPosition ：函数（typeNumber）{ 返回 QRUtil。PATTERN_POSITION_TABLE [typeNumber - 1 ];}，getMask ：函数（maskPattern，i，j）{ 开关（maskPattern）{ 情况 QRMaskPattern。PATTERN000：返回（i + j）％2 == 0 ; 案例 QRMaskPattern。图案001：返回 i ％2 == 0 ; 案例 QRMaskPattern。PATTERN010：返回 j ％3 == 0 ; 案例 QRMaskPattern。PATTERN011：返回（i + j）％3 == 0 ; 案例 QRMaskPattern。PATTERN100：返回（数学。地板（I / 2）+ 数学。地板（j /3））％2 == 0 ; 案例 QRMaskPattern。PATTERN101：返回（i * j）％2 +（i * j）％3 == 0；案例 QRMaskPattern。PATTERN110：返回（（i * j）％2 +（i * j）％3）％2 == 0 ; 案例 QRMaskPattern。模式111：return（（i * j）％3 +（i + j）％2）％2 == 0 ; 默认值：抛出 新 错误（“ bad maskPattern：” + maskPattern）;}}，getErrorCorrectPolynomial ：函数（errorCorrectLength）{ var a = new  QRPolynomial（[ 1 ]，0）; 对于（var i = 0; i < errorCorrectLength; i ++）{a = a。乘（新 QRPolynomial（[ 1，QRMath。gexp（I）]，0））;}
	return a;}，getLengthInBits ：function（mode，type）{ if（1 <= type && type < 10）{ switch（mode）{ case  QRMode。MODE_NUMBER：返回 10；大小写 QRMode。MODE_ALPHA_NUM：返回 9 ; 大小写 QRMode。MODE_8BIT_BYTE：返回 8 ; 大小写 QRMode。MODE_KANJI：返回 8 ; 默认值：抛出 新 错误（“ mode：” + mode）;}} 否则 if（type < 27）{ switch（mode）{ case  QRMode。MODE_NUMBER：返回 12；大小写 QRMode。MODE_ALPHA_NUM：返回 11 ; 大小写 QRMode。MODE_8BIT_BYTE：返回 16 ; 大小写 QRMode。MODE_KANJI：返回 10；默认值：抛出 新 错误（“ mode：” + mode）;}} 否则 if（type < 41）{ switch（mode）{ case  QRMode。MODE_NUMBER：返回 14；大小写 QRMode。MODE_ALPHA_NUM：返回 13 ; 大小写 QRMode。MODE_8BIT_BYTE：返回 16 ; 案例 QRMode。MODE_KANJI：返回 12；默认值：抛出 新 错误（“模式：” +模式）;}} 否则 { 抛出 新 错误（“类型：” +类型）;}}，getLostPoint ：函数（qrCode）{ var moduleCount = qrCode。getModuleCount（）; var lostPoint = 0 ; 对于（var row =0 ;行< moduleCount;行++）{ for（var col = 0 ; col < moduleCount; col ++）{ var sameCount = 0 ; var dark = qrCode。isDark（row，col）; 为（VAR - [R = - 1 ; R <= 1 ; R ++）{ 如果（行+ - [R < 0 || moduleCount <=行+r）{ 继续 ;}
	为（VAR Ç = - 1 ; C ^ <= 1 ; C ^ ++）{ 如果（COL + ç < 0 || moduleCount <= COL + C）{ 继续 ;}
	if（r == 0 && c == 0）{ 继续 ;}
	如果（暗== QRCODE。isDark（行+ R，COL + C））{sameCount ++ ;}}}
	if（sameCount > 5）{lostPoint + =（3 + sameCount - 5）;}}}
	for（var row = 0 ; row < moduleCount - 1 ; row ++）{ for（var col = 0 ; col < moduleCount - 1 ; col ++）{ var count = 0 ; 如果（QRCODE。isDark（行，列））的计++ ; 如果（QRCODE。isDark（行+ 1，列））计数++ ; 如果（QRCODE。isDark（行，列+ 1））计数++ ; 如果（QRCODE。isDark（行+ 1，列+ 1））计数++ ; if（count == 0 || count == 4）{lostPoint + = 3 ;}}}
	为（VAR行= 0 ;排< moduleCount;排++）{ 对于（VAR COL = 0 ; COL < moduleCount - 6 ; COL ++）{ 如果（QRCODE。isDark（行，列）！&& QRCODE。isDark（行，列+ 1）&& QRCODE。isDark（行，列+ 2）&& QRCODE。isDark（行，列+ 3）&& qrCode。isDark（row，col + 4）&&！qrCode。isDark（row，col + 5）&& qrCode。isDark（row，col + 6））{lostPoint + = 40 ;}}}
	为（VAR COL = 0 ; COL < moduleCount; COL ++）{ 对于（VAR行= 0 ;排< moduleCount - 6 ;排++）{ 如果（QRCODE。isDark（行，列）！&& QRCODE。isDark（行+ 1，列）&& QRCODE。isDark（行+ 2，列）&& QRCODE。isDark（行+ 3，col）&& qrCode。isDark（行+ 4，col）&&！qrCode。isDark（行+ 5，列）&& QRCODE。isDark（row + 6，col））{lostPoint + = 40 ;}}}
	var darkCount = 0 ; 为（VAR COL = 0 ; COL < moduleCount; COL ++）{ 对于（VAR行= 0 ;排< moduleCount;排++）{ 如果（QRCODE。isDark（行，列））{darkCount ++ ;}} }
	var ratio = Math。abs（100 * darkCount / moduleCount / moduleCount - 50）/ 5 ; lostPoint + =比率* 10 ; 返回 lostPoint;}}; var QRMath = { glog ：函数（n）{ 如果（n < 1）{ 抛出 新 错误（“ glog（” + n + “）“）;}
	返回 QRMath。LOG_TABLE [n];}，gexp ：函数（n）{ 而（n < 0）{n + = 255 ;}
	而（n > = 256）{n- = 255 ;}
	返回 QRMath。EXP_TABLE [n];}，EXP_TABLE ：新 数组（256），LOG_TABLE ：新 数组（256）}；for（var i = 0 ; i < 8 ; i ++）{ QRMath。EXP_TABLE [i] = 1 << i;}
	for（var i = 8 ; i < 256 ; i ++）{ QRMath。EXP_TABLE [i] = QRMath。EXP_TABLE [i - 4 ] ^ QRMath。EXP_TABLE [i - 5 ] ^ QRMath。EXP_TABLE [i - 6 ] ^ QRMath。EXP_TABLE [i - 8 ];}
	for（var i = 0 ; i < 255 ; i ++）{ QRMath。LOG_TABLE [ QRMath。EXP_TABLE [i]] = i;}
	功能 QRPolynomial（NUM，移位）{ 如果（NUM。长度== 未定义）{ 抛出 新 错误（NUM。长度+ “ / ” +偏移）;}
	var offset = 0 ; 而（偏移< NUM。长度&& NUM [偏移] == 0）{偏移++ ;}
	这个。NUM = 新 阵列（NUM。长度-偏移+偏移）; 为（VAR我= 0 ;我< NUM。长度-偏移;我++）{ 此。num [i] = num [i + offset];}}
	QRPolynomial。prototype = { 获取：函数（索引）{ 返回 此值。num [index];}，getLength ：function（）{ 返回 this。num。长度 ;}，乘法：功能（É）{ VAR NUM = 新 阵列（此。的getLength（）+ Ë。的getLength（）- 1）;为（VAR我= 0 ;我< 此。的getLength（）;我++）{ 对于（VAR Ĵ = 0 ;Ĵ < ê。的getLength（）;Ĵ ++）{NUM [I + j]的^ = QRMath。gexp（QRMath。出入记录（此。得到（i））的+ QRMath。出入记录（Ë。得到（J）））;}}
	返回 新 QRPolynomial（NUM，0）;}，MOD ：功能（É）{ 如果（此。的getLength（）- ë。的getLength（）< 0）{ 返回 此 ;}
	var ratio = QRMath。考勤记录（此。得到（0））- QRMath。考勤记录（Ë。得到（0））; VAR NUM = 新 阵列（此。的getLength（））; 为（VAR我= 0 ;我< 此。的getLength（）;我++）{NUM [I] = 此。得到（i）;}
	为（VAR我= 0 ;我< ê。的getLength（）;我++）{NUM [I] ^ = QRMath。gexp（QRMath。出入记录（Ë。得到（I））+比率）;}
	返回 新的 QRPolynomial（num，0）。mod（e）;}}; 函数 QRRSBlock（totalCount，dataCount）{ this。totalCount = totalCount; 这个。dataCount = dataCount;}
	QRRSBlock.RS_BLOCK_TABLE = [[1,26,19]，[1,26,16]，[1,26,13]，[1,26,9]，[1,44,34]，[1,44， 28]，[1,44,22]，[1,44,16]，[1,70,55]，[1,70,44]，[2,35,17]，[2,35,13] ，[1,100,80]，[2,50,32]，[2,50,24]，[4,25,9]，[1,134,108]，[2,67,43]，[2,33,15， 2,34,16]，[2,33,11,2,34,12]，[2,86,68]，[4,43,27]，[4,43,19]，[4,43， 15]，[2,98,78]，[4,49,31]，[2,32,14,4,33,15]，[4,39,13,1,40,14]，[2,121， 97]，[2,60,38,2,61,39]，[4,40,18,2,41,19]，[4,40,14,2,41,15]，[2,146,116]，[ 3,58,36,2,59,37]，[4,36,16,4,37,17]，[4,36,12,4,37,13]，[2,86,68,2， 87,69]，[4,69,43,1,70,44]，[6,43,19,2,44,20]，[6,43,15,2,44,16]，[4,101， 81]，[1,80,50,4,81,51]，[4,50,22,4,51,23]，[3,36,12,8,37,13]，[2,116,92， 2,117,93]，[6,58,36,2,59,37]，[4,46,20,6,47,21]，[7,42,14,4,43,15]，[4,133,107] ，[8,59,37,1,60,38]，[8,44,20,4,45,21]，[12,33,11,4,34,12]，[3,145,115,1,146,116]，[ 4,64,40,5,65,41]，[11,36,16,5,37,17]，[11,36,12,5,37,13]，[5,109,87,1,110,88] ，[5,65,41,5，66,42]，[5,54,24,7,55,25]，[11,36,12]，[5,122,98,1,123,99]，[7,73,45,3,74,46] ，[15,43,19,2,44,20]，[3,45,15,13,​​46,16]，[1,135,107,5,136,108]，[10,74,46,1,75,47]，[ 1,50,22,15,51,23]，[2,42,14,17,43,15]，[5,150,120,1,151,121]，[9,69,43,4,70,44]，[17， 50,22,1,51,23]，[2,42,14,19,43,15]，[3,141,113,4,142,114]，[3,70,44,11,71,45]，[17,47， 21,4,48,22]，[9,39,13,16,40,14]，[3,135,107,5,136,108]，[3,67,41,13,68,42]，[15,54,24， 5,55,25]，[15,43,15,10,44,16]，[4,144,116,4,145,117]，[17,68,42]，[17,50,22,6,51,23]，[ 19,46,16,6,47,17]，[2,139,111,7,140,​​112]，[17,74,46]，[7,54,24,16,55,25]，[34,37,13]，[ 4,151,121,5,152,122]，[4,75,47,14,76,48]，[11,54,24,14,55,25]，[16,45,15,14,46,16]，[6,147,117， 4,148,118]，[6,73,45,14,74,46]，[11,54,24,16,55,25]，[30,46,16,2,47,17]，[8,132,106,4,133,107] ，[8,75,47,13,76,48]，[7,54,24,22,55,25]，[22,45,15,13,​​46,16]，[10,142,114,2,143,115]，[ 19,74,46,4,75,47]，[28,50,22,6,51，23]，[33,46,16,4,47,17]，[8,152,122,4,153,123]，[22,73,45,3,74,46]，[8,53,23,26,54,24] ，[12,45,15,28,46,16]，[3,147,117,10,148,118]，[3,73,45,23,74,46]，[4,54,24,31,55,25]，[ 11,45,15,31,46,16]，[7,146,116,7,147,117]，[21,73,45,7,74,46]，[1,53,23,37,54,24]，[19， 45,15,26,46,16]，[5,145,115,10,146,116]，[19,75,47,10,76,48]，[15,54,24,25,55,25]，[23,45， 15,25,46,16]，[13,145,115,3,146,116]，[2,74,46,29,75,47]，[42,54,24,1,55,25]，[23,45,15， 28,46,16]，[17,145,115]，[10,74,46,23,75,47]，[10,54,24,35,55,25]，[19,45,15,35,46， 16]，[17,145,115,1,146,116]，[14,74,46,21,75,47]，[29,54,24,19,55,25]，[11,45,15,46,46,16] ，[13,145,115,6,146,116]，[14,74,46,23,75,47]，[44,54,24,7,55,25]，[59,46,16,1,47,17]，[ 12,151,121,7,152,122]，[12,75,47,26,76,48]，[39,54,24,14,55,25]，[22,45,15,41,46,16]，[6,151,121， 14,152,122]，[6,75,47,34,76,48]，[46,54,24,10,55,25]，[2,45,15,64,46,16]，[17,152,122,4,153,123] ，[29,74，46,14,75,47]，[49,54,24,10,55,25]，[24,45,15,46,46,16]，[4,152,122,18,153,123]，[13,74,46， 32,75,47]，[48,54,24,14,55,25]，[42,45,15,32,46,16]，[20,147,117,4,148,118]，[40,75,47,7， 76,48]，[43,54,24,22,55,25]，[10,45,15,67,46,16]，[19,148,118,6,149,119]，[18,75,47,31,76， 48]，[34,54,24,34,55,25]，[20,45,15,61,46,16]]; QRRSBlock.getRSBlocks = function（typeNumber，errorCorrectLevel）{var rsBlock = QRRSBlock.getRsBlockTable（ typeNumber，errorCorrectLevel）; if（rsBlock == undefined）{引发新错误（“坏rs块@ typeNumber：” + typeNumber +“ / errorCorrectLevel：” + errorCorrectLevel）;}15,61,46,16]]]; QRRSBlock.getRSBlocks = function（typeNumber，errorCorrectLevel）{var rsBlock = QRRSBlock.getRsBlockTable（typeNumber，errorCorrectLevel）; if（rsBlock == undefined）{引发新错误（“错误的rs block @ typeNumber：“ + typeNumber +” / errorCorrectLevel：“ + errorCorrectLevel）;}15,61,46,16]]]; QRRSBlock.getRSBlocks = function（typeNumber，errorCorrectLevel）{var rsBlock = QRRSBlock.getRsBlockTable（typeNumber，errorCorrectLevel）; if（rsBlock == undefined）{引发新错误（“错误的rs block @ typeNumber：“ + typeNumber +” / errorCorrectLevel：“ + errorCorrectLevel）;}
	var length = rsBlock。长度/ 3 ; var list = []; for（var i = 0 ; i < length; i ++）{ var count = rsBlock [i * 3 + 0 ]; VAR TOTALCOUNT = rsBlock [I * 3 + 1 ]; var dataCount = rsBlock [i * 3 + 2 ]; 对于（varj = 0 ; j < count; j ++）{ list。推送（新的 QRRSBlock（totalCount，dataCount））;}}
	返回列表；}；QRRSBlock。getRsBlockTable = function（typeNumber，errorCorrectLevel）{ 开关（errorCorrectLevel）{ case  QRErrorCorrectLevel。L：返回 QRRSBlock。RS_BLOCK_TABLE [（typeNumber - 1）* 4 + 0 ]; 大小写 QRErrorCorrectLevel。M：返回 QRRSBlock。RS_BLOCK_TABLE [（typeNumber - 1）*4 + 1 ]; 大小写 QRErrorCorrectLevel。问：返回 QRRSBlock。RS_BLOCK_TABLE [（typeNumber - 1）* 4 + 2 ]; 大小写 QRErrorCorrectLevel。H：返回 QRRSBlock。RS_BLOCK_TABLE [（typeNumber - 1）* 4 + 3 ]; 默认值：返回 undefined ;}}; 起作用 QRBitBuffer（）{ 此。缓冲区= []; 这个。长度= 0 ;}
	QRBitBuffer。原型= { 获取：函数（索引）{ var bufIndex = 数学。地板（索引/ 8）；返回（（此。缓冲液 [bufIndex] >>>（7 -指数％8）） ＆1）== 1 ;}，把：功能（NUM，长度）{ 对于（VAR我= 0 ; i < length; i ++）{ this。putBit（（（（num >>>（length - i - 1））＆1）== 1）;}}，getLengthInBits ：function（）{ 返回 this。length ;}，putBit ：function（bit）{ var bufIndex = Math。地板（这个。长度/ 8）; 如果（此。缓冲器。长度<= bufIndex）{ 此。缓冲。推（0）;}
	如果（位）{ this。缓冲器 [bufIndex] | =（0x80的>>>（此。长度％8））;}
	这个。长度++ ;}}; VAR QRCodeLimitLength = [[ 17，14，11，7 ]，[ 32，26，20，14 ]，[ 53，42，32，24 ]，[ 78，62，46，34 ]，[ 106，84，60，44 ]，[ 134，106，74，58]，[ 154，122，86，64 ]，[ 192，152，108，84 ]，[ 230，180，130，98 ]，[ 271，213，151，119 ]，[ 321，251，177，137 ]，[ 367，287，203，155 ]，[ 425，331，241，177]，[ 458，362，258，194 ]，[ 520，412，292，220 ]，[ 586，450，322，250 ]，[ 644，504，364，280 ]，[ 718，560，394，310 ]，[ 792，624，442，338 ]，[ 858，666，482，382]，[ 929，711，509，403 ]，[ 1003，779，565，439 ]，[ 1091，857，611，461 ]，[ 1171，911，661，511 ]，[ 1273，997，715，535 ]，[ 1367，1059，751，593 ]，[ 1465，1125，805，625 ]，[ 1528，1190，868，658 ]，[ 1628，1264，908，698 ]，[ 1732，1370，982，742 ]，[ 1840，1452，1030，790 ]，[ 1952年，1538，1112，842 ]，[ 2068，1628，1168，898 ]，[ 2188，1722，1228，958 ]，[ 2303，1809，1283，983 ]，[ 2431，1911，1351，1051 ]，[ 2563，1989，1423，1093 ]，[ 2699，2099，1499，1139 ]，[ 2809，2213，1579，1219 ]，[ 2953，2331，1663，1273 ];
	
	函数 _isSupportCanvas（）{
		返回 typeof  CanvasRenderingContext2D  ！=  “未定义”；
	}
	
	// android 2.x不支持Data-URI规范
	函数 _getAndroid（）{
		var android =  false ;
		var sAgent =  导航器。userAgent ;
		
		如果（/机器人/我。试验（赛金））{ //机器人
			android =  true ;
			var aMat =  sAgent。toString（）。匹配（/ android（[ 0-9 ] \。[ 0-9 ]）/ i）;
			
			如果（aMat && aMat [ 1 ]）{
				android =  parseFloat（aMat [ 1 ]）;
			}
		}
		
		返回 android;
	}
	
	var svgDrawer =（function（）{

		var  Drawing  =  function（el，htOption）{
			这个。_el  = el;
			这个。_htOption  = htOption;
		};

		绘图。原型。画 =  功能（oQRCode）{
			var _htOption =  this。_htOption ;
			var _el =  this。_el ;
			var nCount =  oQRCode。getModuleCount（）;
			var nWidth =  Math。地板（_htOption。宽度 / NCOUNT）;
			var nHeight =  Math。地板（_htOption。高度 / NCOUNT）;

			这个。清除（）;

			函数 makeSVG（tag，attrs）{
				var el =  document。createElementNS（' http://www.w3.org/2000/svg '，标记）;
				为（var k in attrs）
					如果（ATTRS。hasOwnProperty（k））的EL。setAttribute（k，attrs [k]）;
				返回 el
			}

			var svg =  makeSVG（“ svg ”，{ ' viewBox '： ' 0 0 '  +  字符串（nCount）+  “  ”  +  字符串（nCount），'宽度'： ' 100％'，'高度'： ' 100％'，'填充'： _htOption。COLORLIGHT }）;
			svg。setAttributeNS（“ http://www.w3.org/2000/xmlns/ ”，“ xmlns：xlink ”，“ http://www.w3.org/1999/xlink ”）；
			_el。appendChild（svg）;

			svg。的appendChild（makeSVG（“矩形”，{ “填充”： _htOption。COLORLIGHT，“宽度”： “ 100％ ” ，“ 高度”： “ 100％ ” }））;
			svg。的appendChild（makeSVG（“矩形”，{ “填充”： _htOption。colorDark，“宽度”： “ 1 ”，“高度”： “ 1 ”，“ ID ”： “模板” }））;

			for（var row =  0 ; row < nCount; row ++）{
				for（var col =  0 ; col < nCount; col ++）{
					如果（oQRCode。isDark（行，列））{
						var child =  makeSVG（“ use ”，{ “ x ”： String（col），“ y ”： String（row）}）;
						孩子。setAttributeNS（“ http://www.w3.org/1999/xlink ”，“ href ”，“ #template ”）
						svg。appendChild（孩子）；
					}
				}
			}
		};
		绘图。原型。清除 =  函数（）{
			而（这个。_el。hasChildNodes（））
				这个。_el。removeChild之（此。_el。lastChild）;
		};
		返回图纸；
	}）（）;

	var useSVG =  document。documentElement。tagName。toLowerCase（）===  “ svg ” ;

	//使用Table标签在DOM中进行绘制
	var Drawing = useSVG 吗？svgDrawer ： ！_isSupportCanvas（）？（函数（）{
		var  Drawing  =  function（el，htOption）{
			这个。_el  = el;
			这个。_htOption  = htOption;
		};
			
		/ **
		 *绘制QRCode
		 * 
		 * @param  {QRCode}  oQRCode
		 * /
		绘图。原型。画 =  功能（oQRCode）{
            var _htOption =  this。_htOption ;
            var _el =  this。_el ;
			var nCount =  oQRCode。getModuleCount（）;
			var nWidth =  Math。地板（_htOption。宽度 / NCOUNT）;
			var nHeight =  Math。地板（_htOption。高度 / NCOUNT）;
			var aHTML = [ ' <table style =“ border：0; border-collapse：collapse;”> ' ];
			
			for（var row =  0 ; row < nCount; row ++）{
				HTML。推（' <tr> '）;
				
				for（var col =  0 ; col < nCount; col ++）{
					HTML。推（' <td style =“ border：0; border-collapse：collapse; padding：0; margin：0; width：'  + nWidth +  ' px; height：'  + nHeight +  ' px; background-color：'  +（oQRCode。isDark（行，列）？ _htOption。colorDark  ： _htOption。COLORLIGHT）+  ' ;“> </ TD> '）;
				}
				
				HTML。推（' </ tr> '）;
			}
			
			HTML。推（' </ table> '）;
			_el。innerHTML  =  aHTML。加入（' '）;
			
			//将边距值固定为实际大小。
			var elTable =  _el。childNodes [ 0 ];
			VAR nLeftMarginTable =（_htOption。宽度 -  elTable。offsetWidth）/  2 ;
			VAR nTopMarginTable =（_htOption。高度 -  elTable。的offsetHeight）/  2 ;
			
			如果（nLeftMarginTable >  0  && nTopMarginTable >  0）{
				elTable。风格。保证金 = nTopMarginTable +  “ px ”  + nLeftMarginTable +  “ px ” ;	
			}
		};
		
		/ **
		 *清除QRCode
		 * /
		绘图。原型。清除 =  函数（）{
			这个。_el。innerHTML  =  ' ' ;
		};
		
		返回图纸；
	}）（） ：（ 函数（）{ //在画布绘制
		函数 _onMakeImage（）{
			这个。_elImage。src  =  此。_elCanvas。toDataURL（“ image / png ”）;
			这个。_elImage。风格。显示 =  “块” ;
			这个。_elCanvas。风格。显示 =  “无” ;			
		}
		
		// Android 2.1错误解决方法
		// http://code.google.com/p/android/issues/detail?id=5141
		如果（此。_android  &&  此。_android  <=  2.1）{
	    	var factor =  1  /  window。devicePixelRatio ;
	        var drawImage =  CanvasRenderingContext2D。原型。drawImage ;
	    	CanvasRenderingContext2D。原型。drawImage  =  function（image，sx，sy，sw，sh，dx，dy，dw，dh）{
	    		如果（（ “ nodeName的” 在图像）&& / IMG /我。试验（图像。nodeName的））{ 
		        	为（VAR我=  参数。长度 -  1 ;我> =  1 ;我-）{
		            	参数 [i] =  参数 [i] *因子；
		        	}
	    		} else  if（typeof dw ==  “ undefined ”）{
	    			参数 [ 1 ] * =因数；
	    			参数 [ 2 ] * = factor;
	    			参数 [ 3 ] * =因数；
	    			参数 [ 4 ] * = factor;
	    		}
	    		
	        	drawImage。应用（this，arguments）;
	    	};
		}
		
		/ **
		 *检查用户的浏览器是否支持数据URI
		 * 
		 * @ 私人
		 * @param  {Function} 如果支持Data URI，则发生fSuccess
		 * @param  {Function} 如果不支持Data URI，则发生fFail
		 * /
		函数 _safeSetDataURI（fSuccess，fFail）{
            var self =  this ;
            自我。_fFail  = fFail;
            自我。_fSuccess  = fSuccess;

            //仅检查一次
            如果（自我。_bSupportDataURI  ===  空）{
                var el =  document。createElement（“ img ”）;
                var  fOnError  =  function（）{
                    自我。_bSupportDataURI  =  false ;

                    如果（自我。_fFail）{
                        自我。_fFail。呼叫（个体经营）；
                    }
                };
                var  fOnSuccess  =  function（）{
                    自我。_bSupportDataURI  =  true ;

                    如果（自我。_fSuccess）{
                        自我。_fSuccess。呼叫（个体经营）；
                    }
                };

                埃尔。onabort  = fOnError;
                埃尔。onerror  = fOnError;
                埃尔。onload  = fOnSuccess;
                埃尔。SRC  =  “数据：图像/ GIF; BASE64，iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4 // 8 / w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg == ” ; //图片包含1px数据。
                回报 ;
            } 否则 如果（自我。_bSupportDataURI  ===  真 &&  自我。_fSuccess）{
                自我。_fSuccess。呼叫（个体经营）；
            } 否则 如果（自我。_bSupportDataURI  ===  假 &&  自我。_fFail）{
                自我。_fFail。呼叫（个体经营）；
            }
		};
		
		/ **
		 *使用画布绘制QRCode
		 * 
		 * @构造函数
		 * @param  {HTMLElement}  el
		 * @param  {Object}  htOption QRCode选项
		 * /
		var  Drawing  =  function（el，htOption）{
    		这个。_bIsPainted  =  false ;
    		这个。_android  =  _getAndroid（）;
		
			这个。_htOption  = htOption;
			这个。_elCanvas  =  文档。createElement（“ canvas ”）;
			这个。_elCanvas。宽度 =  htOption。宽度 ;
			这个。_elCanvas。height  =  htOption。高度 ;
			埃尔。的appendChild（此。_elCanvas）;
			这个。_el  = el;
			这个。_oContext  =  this。_elCanvas。getContext（“ 2d ”）;
			这个。_bIsPainted  =  false ;
			这个。_elImage  =  document。createElement（“ img ”）;
			这个。_elImage。ALT  =  “扫描我！” ;
			这个。_elImage。风格。显示 =  “无” ;
			这个。_el。的appendChild（此。_elImage）;
			这个。_bSupportDataURI  =  null ;
		};
			
		/ **
		 *绘制QRCode
		 * 
		 * @param  {QRCode}  oQRCode 
		 * /
		绘图。原型。画 =  功能（oQRCode）{
            var _elImage =  this。_elImage ;
            var _oContext =  this。_oContext ;
            var _htOption =  this。_htOption ;
            
			var nCount =  oQRCode。getModuleCount（）;
			var nWidth =  _htOption。宽度 / nCount;
			var nHeight =  _htOption。高度 / nCount;
			var nRoundedWidth =  Math。圆（nWidth）;
			var nRoundedHeight =  数学。舍入（nHeight）;

			_elImage。风格。显示 =  “无” ;
			这个。清除（）;
			
			for（var row =  0 ; row < nCount; row ++）{
				for（var col =  0 ; col < nCount; col ++）{
					var bIsDark =  oQRCode。isDark（row，col）;
					var nLeft = col * nWidth;
					var nTop = row * nHeight;
					_oContext。strokeStyle  = bIsDark ？ _htOption。colorDark  ： _htOption。colorLight ;
					_oContext。lineWidth  =  1 ;
					_oContext。fillStyle  = bIsDark ？ _htOption。colorDark  ： _htOption。colorLight ;					
					_oContext。fillRect（nLeft，nTop，nWidth，nHeight）;
					
					// 안티리어싱지방리
					_oContext。strokeRect（
						数学。地板（nLeft）+  0.5，
						数学。底数（nTop）+  0.5，
						nRoundedWidth，
						nRoundedHeight
					）;
					
					_oContext。strokeRect（
						数学。小区（nLeft）-  0.5，
						数学。小区（NTOP）-  0.5，
						nRoundedWidth，
						nRoundedHeight
					）;
				}
			}
			
			这个。_bIsPainted  =  true ;
		};
			
		/ **
		 *如果浏览器支持数据URI，则从Canvas生成图像。
		 * /
		绘图。原型。makeImage  =  function（）{
			如果（此。_bIsPainted）{
				_safeSetDataURI。调用（this，_onMakeImage）;
			}
		};
			
		/ **
		 *返回是否绘制了QRCode
		 * 
		 * @return  {布尔}
		 * /
		绘图。原型。isPainted  =  function（）{
			返回 这个。_bIsPainted ;
		};
		
		/ **
		 *清除QRCode
		 * /
		绘图。原型。清除 =  函数（）{
			这个。_oContext。clearRect（0，0，此。_elCanvas。宽度，此。_elCanvas。高度）;
			这个。_bIsPainted  =  false ;
		};
		
		/ **
		 * @ 私人
		 * @param  {Number}  nNumber
		 * /
		绘图。原型。round  =  函数（nNumber）{
			如果（！ nNumber）{
				返回 nNumber;
			}
			
			返回 Math。底数（nNumber *  1000）/  1000 ;
		};
		
		返回图纸；
	}）（）;
	
	/ **
	 *通过字符串长度获取类型
	 * 
	 * @ 私人
	 * @param  {String}  sText
	 * @param  {Number}  nCorrectLevel
	 * @return  {Number}类型
	 * /
	函数 _getTypeNumber（sText，nCorrectLevel）{			
		var nType =  1 ;
		var length =  _getUTF8Length（sText）;
		
		为（VAR我=  0，LEN =  QRCodeLimitLength。长度 ;我<= LEN;我++）{
			var nLimit =  0 ;
			
			开关（nCorrectLevel）{
				大小写 QRErrorCorrectLevel。L：
					nLimit = QRCodeLimitLength [i] [ 0 ];
					休息 ;
				大小写 QRErrorCorrectLevel。M：
					nLimit = QRCodeLimitLength [i] [ 1 ];
					休息 ;
				大小写 QRErrorCorrectLevel。问：
					nLimit = QRCodeLimitLength [i] [ 2 ];
					休息 ;
				大小写 QRErrorCorrectLevel。高：
					nLimit = QRCodeLimitLength [i] [ 3 ];
					休息 ;
			}
			
			如果（长度<= nLimit）{
				休息 ;
			} 其他 {
				nType ++ ;
			}
		}
		
		如果（n类型>  QRCodeLimitLength。长度）{
			抛出 新的 错误（“数据太长”）；
		}
		
		返回 nType;
	}

	函数 _getUTF8Length（sText）{
		VAR replacedText =  是encodeURI（STEXT）。toString（）。替换（/ \％[ 0-9a-fA-F ] {2} / g，' a '）;
		返回 replaceText。长度 +（replacedText。长度 =！ STEXT ？ 3  ： 0）;
	}
	
	/ **
	 * @class QRCode
	 * @构造函数
	 * @示例 
	 * 新 QRCode的（文件。的getElementById（“测试”）， “ http://jindo.dev.naver.com/collie ”）;
	 *
	 * @示例
	 * var oQRCode =  新 QRCode（“ test ”，{
	 *     文字： “ http://naver.com ”，
	 *     宽度： 128，
	 *     高度： 128
	 * }）;
	 * 
	 * oQRCode。清除（）; //清除QRCode。
	 * oQRCode。makeCode（“ http://map.naver.com ”）; //重新创建QRCode。
	 *
	 * @参数 {HTMLElement的|字符串}  EL目标元素或元素的“id”属性。
	 * @param  {Object | String}  vOption
	 * @param  {String}  vOption.text QRCode链接数据
	 * @param  {Number}  [vOption.width = 256 ]
	 * @param  {Number}  [vOption.height = 256 ]
	 * @param  {String}  [vOption.colorDark = “＃000000 ” ]
	 * @参数 {字符串}  [vOption.colorLight = “ #FFFFFF ” ]
	 * @param  {QRCode.CorrectLevel}  [vOption.correctLevel = QRCode。CorrectLevel。H ] [L | M | Q | H]
	 * /
	QRCode  =  函数（el，vOption）{
		这个。_htOption  = {
			宽度： 256，
			高度： 256，
			typeNumber ： 4，
			colorDark ： “＃000000 ”，
			COLORLIGHT ： “ #FFFFFF ”，
			correctLevel ： QRErrorCorrectLevel。H
		};
		
		如果（typeof vOption ===  '字符串'）{
			vOption	 = {
				文字： vOption
			};
		}
		
		//覆盖选项
		如果（vOption）{
			为（VAR我在 vOption）{
				这个。_htOption [i] = vOption [i];
			}
		}
		
		如果（typeof el ==  “ string ”）{
			el =  document。getElementById（el）;
		}

		如果（此。_htOption。useSVG）{
			绘图= svgDrawer;
		}
		
		这个。_android  =  _getAndroid（）;
		这个。_el  = el;
		这个。_oQRCode  =  null ;
		这个。_oDrawing  =  新 绘图（此。_el，此。_htOption）;
		
		如果（这个。_htOption。文本）{
			这个。makeCode（此。_htOption。文本）;	
		}
	};
	
	/ **
	 *制作QRCode
	 * 
	 * @param  {String}  sText链接数据
	 * /
	QRCode。原型。makeCode  =  函数（sText）{
		这个。_oQRCode  =  新 QRCodeModel（_getTypeNumber（STEXT，此。_htOption。correctLevel），此。_htOption。correctLevel）;
		这个。_oQRCode。addData（STEXT）;
		这个。_oQRCode。make（）;
		这个。_el。title  = sText;
		这个。_oDrawing。绘制（此。_oQRCode）;			
		这个。makeImage（）;
	};
	
	/ **
	 *使图像从画布元素
	 *-它会自动发生
	 *-3以下的Android不支持Data-URI规范。
	 * 
	 * @ 私人
	 * /
	QRCode。原型。makeImage  =  function（）{
		如果（typeof运算 此。_oDrawing。makeImage  ==  “功能”  &&（！此。_android  ||  此。_android  > =  3））{
			这个。_oDrawing。makeImage（）;
		}
	};
	
	/ **
	 *清除QRCode
	 * /
	QRCode。原型。清除 =  函数（）{
		这个。_oDrawing。清除（）;
	};
	
	/ **
	 * @name  QRCode.CorrectLevel
	 * /
	QRCode。CorrectLevel  = QRErrorCorrectLevel;
}）（）;