chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

/*

  돔 변화 관측 → 팝업 카드 타이틀 수정 시작 → 라인 브레이크 ↵ 변환
  돔 변화 관측 → 팝업 카드 타이틀 수정 종료 → ↵ 라인 브레이크 변환

*/

var script = document.createElement('script');

script.textContent = `

  //var jc_line_break_time = Date.now() - 1000
  function jc_line_break() {
  //if( jc_line_break_time - Date.now() > -1000 ) return false
  //    jc_line_break_time = Date.now()
    for( let i = 0; i < document.getElementsByClassName( 'list-card-title' ).length; i ++ ) {
      document.getElementsByClassName( 'list-card-title' )[ i ].innerHTML =
      document.getElementsByClassName( 'list-card-title' )[ i ].innerHTML.replace( /(?:\\r\\n|\\r|\\n)/g, '<br>' )
    //document.getElementsByClassName( 'list-card-title' )[ i ].innerHTML.replace( /↵/g, '<br>' )
    } // for
    console.log( '실행 : jc_line_break()' )
  } // function
  jc_line_break()

  function jc_shift_enter( event, element ) {
    if( ! ( event.shiftKey && event.keyCode == 13 ) ) return false
    var T = element.selectionStart
  //element.value = element.value.substring( 0, T                       ) +  '\\n' +
  //element.value = element.value.substring( 0, T                       ) + '↵\\n' +
  //                element.value.substring(    T, element.value.length )
  //element.selectionEnd = T + 1
  //element.selectionEnd = T + 2
    event.stopImmediatePropagation()
  //event.stopPropagation         ()
  //event.preventDefault          ()
    return false
    console.log( '실행 : jc_shift_enter()' )
  } // function

  //function jc_shift_enter_swap( event, element ) {
  //  element.innerHTML =
  //  element.innerHTML.replace( /↵ /g, '↵\\n' )
  //  console.log( element.innerHTML )
  //  console.log( '실행 : jc_shift_enter_swap()' )
  //} // function

  function jc_key_down( element ) {
    if( document.getElementsByClassName( element )     .length ==                                                       0 ) return false
    if( document.getElementsByClassName( element )[ 0 ].getAttribute( 'onkeydown'                                       ) ) return false
        document.getElementsByClassName( element )[ 0 ].setAttribute( 'onkeydown', 'jc_shift_enter     ( event, this )' )
    //  document.getElementsByClassName( element )[ 0 ].setAttribute( 'onfocus'  , 'jc_shift_enter_swap( event, this )' )
    console.log( '실행 : jc_key_down()' )
  } // function

  var jc_mutation_observer = new MutationObserver( function( mutation ) {
    try {
      if( mutation.length >  2 ) if( mutation[ 2 ].target.classList.contains( 'js-card-detail-title-input' ) ) jc_key_down  ( 'js-card-detail-title-input' )
      if( mutation.length >  1 ) if( mutation[ 1 ].target.classList.contains( 'js-edit-card-title'         ) ) jc_key_down  ( 'js-edit-card-title'         )
      if( mutation.length == 1 ) if( mutation[ 0 ].target.classList.contains( 'js-card-name'               ) ) jc_line_break(                              )
      //               console.log(             mutation )
    } catch( error ) { console.log( '예외 : ' + error    )  }
  } ) // var

  jc_mutation_observer.observe( document.body, {
    childList            : true,
    attributes           : true,
    characterData        : true,
    subtree              : true,
    attributeOldValue    : true,
    characterDataOldValue: true
  } )

`;

( document.head || document.documentElement ).appendChild( script );



	}
	}, 10);
});