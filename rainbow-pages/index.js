function getContent(fileName) {
  return fetch('./content/' + fileName + '.txt').then(response => response.text());
}

getContent('dinosaurs').then(content => dinosaurs.textContent = content);
getContent('bicycles').then(content => bicycles.textContent = content);
getContent('konrad').then(content => konrad.textContent = content);
getContent('germany').then(content => germany.textContent = content);
getContent('sumer').then(content => sumer.textContent = content);
getContent('fashion').then(content => fashion.textContent = content);

let options = {}

document.body.style.transition = '1s ease background-color';

var callback = function(entries, observer) {

  let entry = entries.find(entry => {
    return entry.intersectionRatio > 0;
  });

  if (entry) {
    document.body.style.backgroundColor = entry.target.dataset.bg;
  }
};

var observer = new IntersectionObserver(callback, options);

observer.observe(dinosaurs);
observer.observe(bicycles);
observer.observe(konrad);
observer.observe(sumer);
observer.observe(germany);
observer.observe(fashion);
