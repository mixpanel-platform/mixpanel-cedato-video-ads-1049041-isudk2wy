var today = moment().format("YYYY-MM-DD")
var params = {
  today: today
}
MP.api.jql(function main() {
  return Events({
    from_date: params.today,
    to_date: params.today
  })
  // group each user's events by the day they were triggered,
  // and count how many events they sent each day
  .groupByUser([function(event) {
  return new Date(event.time).toISOString().substr(0, 10);
}], function(count, events) {
    count = count || 0;
    return count + events.length;
  })
  .groupBy(["key.1"], mixpanel.reducer.count());
}, params).done(function(results){
  console.log("users today", results);
  $("#dau-header").text(addCommas(results[0].value))
})


params = {
  from: moment(),                          // the earliest date you'd like to include in the query
  to: moment(),                         // the latest date you'd like to include in the query
  limit: 1,                             // maximum number of results to return
  type: 'general',                        // analysis type for the data, can be 'general', 'unique', or 'average'
  unit: 'day'                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
}
MP.api.segment('Download', params).done(function(results){
  console.log("downloads", results.values());
  var downloads = results.values()
  console.log(downloads['Download']);
  $("#downloads-panel").text(downloads['Download'][today])
})
