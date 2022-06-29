import { createTableControlUI, applySelected } from "./modules/table-control.js";

(function($){

  let defaultSelected = [
    "exposure_time",
    "filter",
    "disperser",
    "airmass",
    "target_name",
    "time_begin_tai",
  ];

  let meta = loadMetadata();
  createTableControlUI($('.channel-grid-heading'), defaultSelected);
  applySelected(defaultSelected);
  let selected = defaultSelected;

  setInterval(function refreshTable(){
    let date = $('.the-date')[0].dataset.date;
    let url_path = document.location.pathname;
    $.get(url_path + "/update/" + date, function(res){
      $('.channel-day-data').html(res);
    }).done(function(){
      meta = loadMetadata();
      applySelected(meta, selected);
      createTableControlUI(meta, $('.channel-grid-heading'), selected);
    }).fail(function(){
      console.log("Couldn't reach server");
    })
  }, 5000);

})(jQuery)
