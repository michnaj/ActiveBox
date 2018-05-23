$(function() {
  const intervalTime = 5000, //slide display time
        animationDuration = 500; //animation duration
  let clients,
      clientsList = $('#clients'),
      indicatorsList = $('#indicators .controls'),
      numClients = clientsList.find('.client').length;

  // Menu - smooth scrolling
  $('#menu a').click(function(event) {
    event.preventDefault();
		let goTo = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(goTo).offset().top
		}, 1000);
  });

  // Go to top smooth scrolling
  $("#totop").click(function(event) {
		event.preventDefault();
		$("html, body").animate({scrollTop: 0}, 1000);
  });

  function startSlider() {
    clients = setInterval(changeClient, intervalTime);
  }

  function stopSlider() {
    clearInterval(clients);
  }

  //Getting index of client element
  function getIndex(elem) {
    if (elem === 'active') {
      return clientsList.find('.client.active').index();
    } else {
      let activeElem = getIndex('active');
      if (activeElem === (numClients - 1)) {
        return 0;
      } else {
        return activeElem + 1;
      }
    }
  }

  function setActiveClient(active, next) {
    clientsList.find('.client').eq(active).fadeOut(animationDuration, () => {
      clientsList.find('.client').eq(active).removeClass('active');
      clientsList.find('.client').eq(next).addClass('active').hide();
      clientsList.find('.client').eq(next).fadeIn(animationDuration);
      indicatorsList.find('li').eq(active).removeClass('active');
      indicatorsList.find('li').eq(next).addClass('active');
    });
  }

  //Change client
  function changeClient(client) {
    let activeElem = getIndex('active'),
        nextElem = client || getIndex();
    setActiveClient(activeElem, nextElem);
  }

  // Indicatiors listener
  indicatorsList.on('click', '[data-go-to-client]', function(event) {
    event.preventDefault();
    let nextElem = $(this).attr('data-go-to-client');
    stopSlider();
    changeClient(nextElem);
    startSlider();
  });

  startSlider();
});