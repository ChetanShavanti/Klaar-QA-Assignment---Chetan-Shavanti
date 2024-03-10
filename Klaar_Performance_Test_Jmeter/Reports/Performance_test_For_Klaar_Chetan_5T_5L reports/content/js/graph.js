/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 315.0, "series": [{"data": [[300.0, 2.0], [100.0, 23.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [100.0, 18.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[100.0, 22.0], [200.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[0.0, 1.0], [200.0, 4.0], [100.0, 20.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[0.0, 23.0], [100.0, 2.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [100.0, 16.0], [200.0, 3.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[0.0, 47.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[0.0, 17.0], [100.0, 8.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[0.0, 23.0], [300.0, 1.0], [200.0, 5.0], [100.0, 21.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[300.0, 1.0], [100.0, 21.0], [200.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[100.0, 25.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[33700.0, 1.0], [34700.0, 1.0], [38000.0, 1.0], [20500.0, 1.0], [21000.0, 1.0], [21100.0, 1.0], [22300.0, 2.0], [22100.0, 1.0], [23500.0, 3.0], [23100.0, 1.0], [22900.0, 1.0], [23900.0, 1.0], [23800.0, 2.0], [24100.0, 1.0], [24400.0, 1.0], [24300.0, 1.0], [26000.0, 1.0], [25600.0, 1.0], [27100.0, 1.0], [28200.0, 1.0], [29000.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 22.0], [100.0, 3.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[0.0, 166.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[100.0, 21.0], [200.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[300.0, 1.0], [100.0, 21.0], [200.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[100.0, 23.0], [200.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [300.0, 2.0], [700.0, 2.0], [400.0, 2.0], [200.0, 5.0], [100.0, 6.0], [1800.0, 1.0], [3600.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[100.0, 23.0], [200.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[300.0, 4.0], [100.0, 12.0], [400.0, 3.0], [200.0, 6.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[100.0, 21.0], [200.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[0.0, 58.0], [300.0, 1.0], [100.0, 35.0], [200.0, 6.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[300.0, 2.0], [100.0, 16.0], [200.0, 7.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[0.0, 1.0], [100.0, 21.0], [200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[100.0, 23.0], [200.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[300.0, 1.0], [100.0, 20.0], [200.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[0.0, 17.0], [100.0, 8.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[600.0, 5.0], [700.0, 4.0], [800.0, 3.0], [400.0, 4.0], [900.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[0.0, 23.0], [100.0, 2.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 1.0], [700.0, 1.0], [800.0, 2.0], [3500.0, 2.0], [900.0, 2.0], [1000.0, 3.0], [300.0, 2.0], [1200.0, 1.0], [400.0, 2.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[600.0, 1.0], [2500.0, 1.0], [700.0, 1.0], [2900.0, 1.0], [200.0, 4.0], [800.0, 1.0], [900.0, 2.0], [1200.0, 1.0], [300.0, 1.0], [1400.0, 2.0], [1500.0, 2.0], [100.0, 3.0], [400.0, 1.0], [500.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[100.0, 21.0], [200.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[3200.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [4300.0, 1.0], [4200.0, 1.0], [4100.0, 1.0], [4600.0, 2.0], [4800.0, 3.0], [4900.0, 5.0], [5000.0, 1.0], [5100.0, 1.0], [5200.0, 1.0], [5400.0, 2.0], [5700.0, 1.0], [6200.0, 1.0], [6400.0, 1.0], [7400.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[300.0, 1.0], [100.0, 22.0], [200.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[100.0, 19.0], [200.0, 6.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[100.0, 66.0], [200.0, 9.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[0.0, 56.0], [200.0, 1.0], [100.0, 18.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[300.0, 2.0], [100.0, 19.0], [200.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[300.0, 1.0], [100.0, 22.0], [200.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[600.0, 6.0], [700.0, 1.0], [400.0, 6.0], [500.0, 12.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[600.0, 3.0], [2700.0, 1.0], [700.0, 4.0], [800.0, 5.0], [900.0, 8.0], [1000.0, 6.0], [1100.0, 1.0], [1200.0, 5.0], [1300.0, 3.0], [1400.0, 2.0], [1500.0, 2.0], [1600.0, 2.0], [400.0, 5.0], [500.0, 3.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 315.0], [100.0, 8.0], [200.0, 2.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[300.0, 1.0], [200.0, 15.0], [100.0, 7.0], [400.0, 2.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 2.0], [300.0, 1.0], [700.0, 2.0], [6100.0, 1.0], [3100.0, 1.0], [800.0, 1.0], [100.0, 9.0], [200.0, 4.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[100.0, 20.0], [200.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[0.0, 20.0], [100.0, 5.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[300.0, 3.0], [100.0, 66.0], [200.0, 6.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [100.0, 61.0], [200.0, 6.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 14.0], [700.0, 2.0], [800.0, 2.0], [900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[0.0, 21.0], [200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [100.0, 22.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[300.0, 5.0], [200.0, 6.0], [100.0, 14.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[0.0, 19.0], [100.0, 6.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[300.0, 1.0], [100.0, 19.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[0.0, 30.0], [200.0, 7.0], [100.0, 13.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[300.0, 1.0], [100.0, 42.0], [200.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[0.0, 40.0], [100.0, 10.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[0.0, 3.0], [100.0, 20.0], [200.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[100.0, 25.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 41.0], [200.0, 7.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[300.0, 1.0], [100.0, 20.0], [200.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[600.0, 1.0], [700.0, 3.0], [900.0, 2.0], [1000.0, 3.0], [1100.0, 3.0], [1300.0, 3.0], [1500.0, 1.0], [400.0, 1.0], [6700.0, 1.0], [7300.0, 1.0], [1900.0, 1.0], [2000.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[0.0, 23.0], [100.0, 2.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[0.0, 6.0], [100.0, 13.0], [200.0, 6.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[300.0, 1.0], [100.0, 23.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 37.0], [100.0, 10.0], [200.0, 3.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [600.0, 1.0], [1300.0, 2.0], [2600.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [200.0, 6.0], [400.0, 1.0], [100.0, 8.0], [800.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[100.0, 23.0], [200.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[300.0, 4.0], [100.0, 7.0], [200.0, 13.0], [400.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 38000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 49.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 2418.0, "series": [{"data": [[0.0, 2418.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 158.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 49.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 75.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 3.851272015655581, "minX": 1.71007548E12, "maxY": 5.0, "series": [{"data": [[1.71007548E12, 4.992555831265509], [1.7100756E12, 3.851272015655581], [1.71007554E12, 5.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7100756E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 35.0, "minX": 1.0, "maxY": 25882.428571428572, "series": [{"data": [[5.0, 140.36363636363635], [3.0, 133.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[4.76, 139.48]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-Aggregated", "isController": false}, {"data": [[5.0, 114.78260869565217], [3.0, 110.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[4.84, 114.44]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-Aggregated", "isController": false}, {"data": [[5.0, 143.13636363636363], [3.0, 126.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[4.76, 141.11999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 133.4090909090909], [3.0, 119.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[4.76, 131.67999999999998]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-Aggregated", "isController": false}, {"data": [[5.0, 80.72727272727273], [3.0, 76.33333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[4.76, 80.2]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[5.0, 137.27272727272725], [3.0, 106.66666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[4.76, 133.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-Aggregated", "isController": false}, {"data": [[5.0, 62.72727272727271], [3.0, 62.33333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[4.76, 62.67999999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-Aggregated", "isController": false}, {"data": [[5.0, 97.6086956521739], [3.0, 97.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[4.84, 97.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-Aggregated", "isController": false}, {"data": [[5.0, 135.9545454545455], [3.0, 125.33333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[4.76, 134.68000000000004]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-Aggregated", "isController": false}, {"data": [[5.0, 149.08333333333334], [3.0, 100.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[4.92, 147.12]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-Aggregated", "isController": false}, {"data": [[5.0, 126.63636363636364], [3.0, 153.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[4.76, 129.84000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[4.0, 24375.0], [2.0, 22334.0], [1.0, 21157.0], [5.0, 25882.428571428572], [3.0, 22117.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[4.599999999999999, 25340.56]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[5.0, 65.50000000000001], [3.0, 68.33333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[4.76, 65.84]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-Aggregated", "isController": false}, {"data": [[4.0, 36.0], [1.0, 37.0], [5.0, 46.95679012345677], [3.0, 36.22222222222222]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[4.839999999999999, 46.165714285714266]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-Aggregated", "isController": false}, {"data": [[5.0, 159.36363636363635], [3.0, 145.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[4.76, 157.71999999999997]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[5.0, 163.87499999999997], [3.0, 220.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[4.92, 166.11999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-Aggregated", "isController": false}, {"data": [[1.0, 118.0], [5.0, 142.18181818181816], [3.0, 164.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[4.68, 143.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[5.0, 542.4399999999999]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[5.0, 542.4399999999999]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-Aggregated", "isController": false}, {"data": [[5.0, 137.58333333333334], [3.0, 115.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[4.92, 136.68]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[1.0, 156.0], [5.0, 245.09090909090907], [3.0, 271.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[4.68, 243.63999999999996]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-Aggregated", "isController": false}, {"data": [[1.0, 112.0], [5.0, 160.09090909090907], [3.0, 170.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[4.68, 158.95999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-Aggregated", "isController": false}, {"data": [[5.0, 105.37500000000006], [3.0, 126.33333333333334]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[4.76, 107.89000000000006]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[5.0, 184.3913043478261], [3.0, 120.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[4.84, 179.24]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-Aggregated", "isController": false}, {"data": [[1.0, 106.0], [5.0, 149.45454545454544], [3.0, 128.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[4.68, 145.99999999999997]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-Aggregated", "isController": false}, {"data": [[5.0, 137.62499999999997], [3.0, 118.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[4.92, 136.83999999999997]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[5.0, 163.86363636363637], [3.0, 162.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[4.76, 163.68]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-Aggregated", "isController": false}, {"data": [[5.0, 99.5], [3.0, 89.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[4.76, 98.24]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-Aggregated", "isController": false}, {"data": [[5.0, 637.8636363636364], [3.0, 644.3333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[4.76, 638.64]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-Aggregated", "isController": false}, {"data": [[5.0, 63.31818181818183], [3.0, 59.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[4.76, 62.80000000000001]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[5.0, 1235.8800000000003]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[5.0, 1235.8800000000003]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-Aggregated", "isController": false}, {"data": [[2.0, 203.0], [5.0, 1069.2272727272725], [3.0, 237.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[4.72, 968.0399999999998]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-Aggregated", "isController": false}, {"data": [[5.0, 144.1818181818182], [3.0, 149.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[4.76, 144.84]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-Aggregated", "isController": false}, {"data": [[5.0, 5049.375], [3.0, 3246.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[4.92, 4977.24]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-Aggregated", "isController": false}, {"data": [[5.0, 150.54166666666669], [3.0, 120.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[4.92, 149.32000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-Aggregated", "isController": false}, {"data": [[5.0, 160.30434782608697], [3.0, 190.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[4.84, 162.68]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-Aggregated", "isController": false}, {"data": [[5.0, 40.75], [3.0, 38.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[4.92, 40.64]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-Aggregated", "isController": false}, {"data": [[2.0, 143.0], [5.0, 152.56060606060603], [3.0, 163.375]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[4.746666666666668, 153.58666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-Aggregated", "isController": false}, {"data": [[5.0, 93.78787878787882], [3.0, 96.33333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[4.760000000000002, 94.09333333333339]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-Aggregated", "isController": false}, {"data": [[1.0, 112.0], [5.0, 176.3181818181818], [3.0, 121.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[4.68, 169.32000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-Aggregated", "isController": false}, {"data": [[5.0, 142.0], [3.0, 135.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[4.76, 141.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-Aggregated", "isController": false}, {"data": [[5.0, 566.909090909091], [3.0, 509.3333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[4.76, 560.0000000000001]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-Aggregated", "isController": false}, {"data": [[5.0, 1007.0399999999998]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[5.0, 1007.0399999999998]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[2.0, 47.0], [1.0, 50.0], [5.0, 53.48951048951048], [3.0, 49.87500000000001]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[4.719999999999998, 53.04923076923077]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[5.0, 240.5], [3.0, 225.66666666666666]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[4.76, 238.71999999999997]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[5.0, 798.5599999999997]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[5.0, 798.5599999999997]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 172.31818181818184], [3.0, 155.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[4.76, 170.24000000000004]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-Aggregated", "isController": false}, {"data": [[5.0, 73.13636363636365], [3.0, 97.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[4.76, 76.00000000000001]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-Aggregated", "isController": false}, {"data": [[4.0, 135.0], [5.0, 151.85074626865676], [3.0, 143.71428571428572]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[4.800000000000001, 150.86666666666673]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-Aggregated", "isController": false}, {"data": [[4.0, 47.0], [5.0, 46.21739130434783], [3.0, 49.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[4.88, 46.36]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[2.0, 67.0], [5.0, 68.68181818181817], [3.0, 64.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[4.72, 68.24]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-Aggregated", "isController": false}, {"data": [[5.0, 138.61971830985917], [3.0, 120.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[4.893333333333333, 137.6266666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-Aggregated", "isController": false}, {"data": [[5.0, 675.4166666666667], [3.0, 703.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[4.92, 676.5200000000001]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-Aggregated", "isController": false}, {"data": [[5.0, 72.36363636363637], [3.0, 68.66666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[4.76, 71.92000000000002]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[5.0, 137.9545454545455], [3.0, 184.66666666666666]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[4.76, 143.56000000000003]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[4.0, 150.0], [2.0, 151.0], [1.0, 146.0], [5.0, 216.14285714285714], [3.0, 263.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[4.599999999999999, 209.95999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-Aggregated", "isController": false}, {"data": [[5.0, 87.40909090909092], [3.0, 82.66666666666667]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[4.76, 86.84]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-Aggregated", "isController": false}, {"data": [[5.0, 192.09090909090907], [3.0, 172.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[4.76, 189.75999999999996]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-Aggregated", "isController": false}, {"data": [[1.0, 87.0], [5.0, 122.72727272727273], [3.0, 99.8]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[4.720000000000001, 119.72000000000001]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[4.0, 161.0], [2.0, 133.0], [1.0, 135.0], [5.0, 159.04651162790694], [3.0, 145.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[4.68, 156.95999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 88.6590909090909], [3.0, 100.83333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[4.76, 90.12]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-Aggregated", "isController": false}, {"data": [[5.0, 120.54545454545455], [3.0, 151.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[4.76, 124.24]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-Aggregated", "isController": false}, {"data": [[1.0, 122.0], [5.0, 133.40909090909088], [3.0, 123.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[4.68, 132.15999999999997]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-Aggregated", "isController": false}, {"data": [[1.0, 110.0], [5.0, 147.22727272727272], [3.0, 159.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[4.720000000000001, 147.7]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-Aggregated", "isController": false}, {"data": [[1.0, 111.0], [5.0, 164.86363636363635], [3.0, 149.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[4.68, 161.44]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-Aggregated", "isController": false}, {"data": [[5.0, 1500.88]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[5.0, 1500.88]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-Aggregated", "isController": false}, {"data": [[5.0, 44.50000000000001], [3.0, 35.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[4.92, 44.120000000000005]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-Aggregated", "isController": false}, {"data": [[5.0, 160.36363636363635], [3.0, 101.66666666666667]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[4.76, 153.31999999999996]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-Aggregated", "isController": false}, {"data": [[5.0, 147.45454545454544], [3.0, 166.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[4.76, 149.72]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 93.00000000000003], [3.0, 107.16666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[4.76, 94.70000000000003]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-Aggregated", "isController": false}, {"data": [[5.0, 551.0909090909091], [3.0, 294.3333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[4.760000000000001, 520.2800000000001]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 142.0], [3.0, 145.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[4.76, 142.36]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-Aggregated", "isController": false}, {"data": [[2.0, 218.0], [1.0, 173.0], [5.0, 255.27272727272728], [3.0, 273.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}, {"data": [[4.64, 251.20000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 4889.833333333333, "minX": 1.71007548E12, "maxY": 152863.13333333333, "series": [{"data": [[1.71007548E12, 85564.58333333333], [1.7100756E12, 57845.0], [1.71007554E12, 152863.13333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71007548E12, 7752.1], [1.7100756E12, 4889.833333333333], [1.71007554E12, 13532.233333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7100756E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 37.0, "minX": 1.71007548E12, "maxY": 30746.833333333332, "series": [{"data": [[1.71007548E12, 121.57142857142857], [1.7100756E12, 175.4], [1.71007554E12, 135.3076923076923]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007548E12, 105.875], [1.7100756E12, 174.0], [1.71007554E12, 106.57142857142857]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007548E12, 171.57142857142856], [1.7100756E12, 126.0], [1.71007554E12, 130.53846153846155]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007548E12, 127.14285714285714], [1.7100756E12, 149.25], [1.71007554E12, 128.92857142857144]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007548E12, 79.0], [1.7100756E12, 89.6], [1.71007554E12, 77.23076923076923]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007548E12, 122.00000000000001], [1.7100756E12, 108.6], [1.71007554E12, 149.46153846153848]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007548E12, 68.78571428571428], [1.7100756E12, 62.3], [1.71007554E12, 59.53846153846154]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007548E12, 94.375], [1.7100756E12, 106.0], [1.71007554E12, 97.64285714285714]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007548E12, 139.2142857142857], [1.7100756E12, 123.88888888888889], [1.71007554E12, 135.92592592592592]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007548E12, 133.44444444444446], [1.7100756E12, 137.66666666666666], [1.71007554E12, 158.76923076923077]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007548E12, 131.85714285714286], [1.7100756E12, 138.2], [1.71007554E12, 125.53846153846153]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 30746.833333333332], [1.7100756E12, 23039.333333333332], [1.71007554E12, 23907.46153846154]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007548E12, 86.0], [1.7100756E12, 70.0], [1.71007554E12, 53.38461538461538]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007548E12, 43.740740740740726], [1.7100756E12, 50.22222222222222], [1.71007554E12, 46.393617021276604]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007548E12, 193.14285714285714], [1.7100756E12, 130.8], [1.71007554E12, 149.00000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 145.74999999999997], [1.7100756E12, 192.0], [1.71007554E12, 172.2142857142857]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007548E12, 141.99999999999997], [1.7100756E12, 152.5], [1.71007554E12, 138.83333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 559.0], [1.7100756E12, 340.0], [1.71007554E12, 579.25]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007548E12, 123.375], [1.7100756E12, 135.66666666666666], [1.71007554E12, 144.50000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007548E12, 261.5], [1.7100756E12, 202.33333333333331], [1.71007554E12, 254.46153846153848]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007548E12, 160.28571428571428], [1.7100756E12, 135.33333333333334], [1.71007554E12, 170.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007548E12, 121.14285714285718], [1.7100756E12, 118.6], [1.71007554E12, 96.63461538461539]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007548E12, 217.5], [1.7100756E12, 119.66666666666667], [1.71007554E12, 170.14285714285717]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007548E12, 116.16666666666666], [1.7100756E12, 200.33333333333331], [1.71007554E12, 134.6923076923077]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007548E12, 118.33333333333333], [1.7100756E12, 132.0], [1.71007554E12, 150.76923076923075]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007548E12, 198.0], [1.7100756E12, 155.8], [1.71007554E12, 148.23076923076923]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007548E12, 107.28571428571428], [1.7100756E12, 89.2], [1.71007554E12, 96.84615384615384]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007548E12, 707.1428571428571], [1.7100756E12, 593.0], [1.71007554E12, 619.3076923076923]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007548E12, 75.85714285714286], [1.7100756E12, 57.6], [1.71007554E12, 57.76923076923077]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007548E12, 1315.5000000000002], [1.7100756E12, 1630.3333333333335], [1.71007554E12, 1070.9166666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007548E12, 415.85714285714283], [1.7100756E12, 754.8333333333334], [1.71007554E12, 1396.7499999999998]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007548E12, 161.28571428571428], [1.7100756E12, 140.8], [1.71007554E12, 137.53846153846152]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007548E12, 5634.333333333333], [1.7100756E12, 4174.0], [1.71007554E12, 4707.6923076923085]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007548E12, 130.77777777777777], [1.7100756E12, 125.66666666666667], [1.71007554E12, 167.61538461538458]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007548E12, 165.125], [1.7100756E12, 185.25], [1.71007554E12, 154.23076923076923]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007548E12, 38.111111111111114], [1.7100756E12, 38.666666666666664], [1.71007554E12, 42.84615384615384]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007548E12, 162.90476190476195], [1.7100756E12, 153.68749999999997], [1.71007554E12, 148.39473684210526]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007548E12, 106.14285714285715], [1.7100756E12, 87.0], [1.71007554E12, 90.33333333333334]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007548E12, 163.0], [1.7100756E12, 130.33333333333334], [1.71007554E12, 192.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007548E12, 174.2857142857143], [1.7100756E12, 127.0], [1.71007554E12, 128.84615384615384]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007548E12, 559.2857142857143], [1.7100756E12, 550.75], [1.71007554E12, 563.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007548E12, 1270.1499999999999], [1.7100756E12, 826.8333333333334], [1.71007554E12, 832.8333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 54.54022988505748], [1.7100756E12, 50.04166666666665], [1.71007554E12, 53.57228915662652]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 227.42857142857142], [1.7100756E12, 261.4], [1.71007554E12, 236.0769230769231]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 1507.1999999999998], [1.7100756E12, 154.66666666666666], [1.71007554E12, 369.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 184.14285714285717], [1.7100756E12, 144.33333333333334], [1.71007554E12, 175.08333333333331]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007548E12, 71.0], [1.7100756E12, 94.0], [1.71007554E12, 71.76923076923077]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007548E12, 163.04545454545456], [1.7100756E12, 132.0], [1.71007554E12, 150.7692307692308]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007548E12, 44.25], [1.7100756E12, 69.0], [1.71007554E12, 42.71428571428572]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 81.0], [1.7100756E12, 64.66666666666667], [1.71007554E12, 62.58333333333333]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007548E12, 154.34615384615387], [1.7100756E12, 118.27272727272727], [1.71007554E12, 131.78947368421052]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007548E12, 687.7777777777778], [1.7100756E12, 775.0], [1.71007554E12, 646.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007548E12, 93.28571428571429], [1.7100756E12, 72.6], [1.71007554E12, 60.15384615384616]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 134.42857142857144], [1.7100756E12, 164.0], [1.71007554E12, 140.6153846153846]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 196.83333333333331], [1.7100756E12, 171.33333333333334], [1.71007554E12, 233.84615384615384]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007548E12, 91.14285714285715], [1.7100756E12, 102.2], [1.71007554E12, 78.61538461538463]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007548E12, 227.0], [1.7100756E12, 160.2], [1.71007554E12, 181.0769230769231]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007548E12, 136.5714285714286], [1.7100756E12, 95.54545454545455], [1.71007554E12, 120.91999999999999]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007548E12, 148.53846153846155], [1.7100756E12, 140.36363636363635], [1.71007554E12, 168.19230769230768]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007548E12, 89.85714285714286], [1.7100756E12, 108.2], [1.71007554E12, 83.30769230769229]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007548E12, 132.85714285714286], [1.7100756E12, 132.6], [1.71007554E12, 116.38461538461539]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007548E12, 128.57142857142858], [1.7100756E12, 122.33333333333334], [1.71007554E12, 139.16666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007548E12, 157.2142857142857], [1.7100756E12, 138.1818181818182], [1.71007554E12, 146.55999999999997]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007548E12, 170.57142857142856], [1.7100756E12, 129.0], [1.71007554E12, 172.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007548E12, 2350.3], [1.7100756E12, 899.0], [1.71007554E12, 943.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007548E12, 39.375], [1.7100756E12, 37.0], [1.71007554E12, 48.35714285714286]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007548E12, 168.14285714285714], [1.7100756E12, 99.4], [1.71007554E12, 166.07692307692307]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007548E12, 184.0], [1.7100756E12, 151.4], [1.71007554E12, 130.61538461538464]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 98.85714285714286], [1.7100756E12, 110.0], [1.71007554E12, 86.5769230769231]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007548E12, 764.4545454545454], [1.7100756E12, 261.0], [1.71007554E12, 339.6666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 164.14285714285714], [1.7100756E12, 132.6], [1.71007554E12, 134.38461538461536]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007548E12, 255.33333333333334], [1.7100756E12, 221.66666666666669], [1.71007554E12, 262.9230769230769]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7100756E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 35.85714285714286, "minX": 1.71007548E12, "maxY": 30378.833333333332, "series": [{"data": [[1.71007548E12, 118.28571428571428], [1.7100756E12, 175.2], [1.71007554E12, 133.46153846153845]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007548E12, 105.74999999999999], [1.7100756E12, 174.0], [1.71007554E12, 106.07142857142857]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007548E12, 169.71428571428572], [1.7100756E12, 125.6], [1.71007554E12, 130.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007548E12, 127.14285714285714], [1.7100756E12, 149.25], [1.71007554E12, 128.92857142857144]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007548E12, 78.85714285714286], [1.7100756E12, 89.6], [1.71007554E12, 77.23076923076923]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007548E12, 122.00000000000001], [1.7100756E12, 108.6], [1.71007554E12, 149.46153846153848]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007548E12, 68.78571428571428], [1.7100756E12, 62.3], [1.71007554E12, 59.49999999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007548E12, 94.375], [1.7100756E12, 106.0], [1.71007554E12, 97.64285714285714]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007548E12, 139.2142857142857], [1.7100756E12, 123.88888888888889], [1.71007554E12, 135.92592592592592]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007548E12, 133.44444444444446], [1.7100756E12, 137.66666666666666], [1.71007554E12, 158.76923076923077]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007548E12, 131.7142857142857], [1.7100756E12, 138.2], [1.71007554E12, 125.53846153846153]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 30378.833333333332], [1.7100756E12, 22747.333333333332], [1.71007554E12, 23605.69230769231]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007548E12, 86.0], [1.7100756E12, 70.0], [1.71007554E12, 53.38461538461538]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007548E12, 43.70370370370372], [1.7100756E12, 50.18518518518518], [1.71007554E12, 46.37234042553192]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007548E12, 193.14285714285714], [1.7100756E12, 130.8], [1.71007554E12, 149.00000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 138.125], [1.7100756E12, 186.66666666666666], [1.71007554E12, 163.92857142857144]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007548E12, 141.99999999999997], [1.7100756E12, 152.5], [1.71007554E12, 138.16666666666669]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 559.0], [1.7100756E12, 340.0], [1.71007554E12, 579.25]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007548E12, 123.25], [1.7100756E12, 135.66666666666666], [1.71007554E12, 144.50000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007548E12, 261.5], [1.7100756E12, 202.33333333333331], [1.71007554E12, 254.3846153846154]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007548E12, 160.28571428571428], [1.7100756E12, 135.33333333333334], [1.71007554E12, 170.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007548E12, 121.14285714285718], [1.7100756E12, 118.6], [1.71007554E12, 96.61538461538461]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007548E12, 185.5], [1.7100756E12, 99.0], [1.71007554E12, 144.42857142857144]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007548E12, 116.16666666666666], [1.7100756E12, 198.5], [1.71007554E12, 134.23076923076923]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007548E12, 118.33333333333333], [1.7100756E12, 132.0], [1.71007554E12, 150.76923076923075]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007548E12, 190.2857142857143], [1.7100756E12, 149.8], [1.71007554E12, 140.6153846153846]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007548E12, 107.28571428571428], [1.7100756E12, 89.2], [1.71007554E12, 96.84615384615384]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007548E12, 688.1428571428571], [1.7100756E12, 577.6], [1.71007554E12, 602.5384615384615]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007548E12, 75.85714285714286], [1.7100756E12, 57.6], [1.71007554E12, 57.76923076923077]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007548E12, 1305.6], [1.7100756E12, 1622.0], [1.71007554E12, 1060.8333333333335]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007548E12, 415.85714285714283], [1.7100756E12, 754.8333333333334], [1.71007554E12, 1396.7499999999998]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007548E12, 161.28571428571428], [1.7100756E12, 139.0], [1.71007554E12, 137.53846153846152]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007548E12, 5631.888888888889], [1.7100756E12, 4173.333333333333], [1.71007554E12, 4706.615384615384]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007548E12, 130.77777777777777], [1.7100756E12, 125.66666666666667], [1.71007554E12, 167.53846153846155]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007548E12, 165.0], [1.7100756E12, 183.25], [1.71007554E12, 153.30769230769232]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007548E12, 37.111111111111114], [1.7100756E12, 36.666666666666664], [1.71007554E12, 41.84615384615385]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007548E12, 161.9523809523809], [1.7100756E12, 152.875], [1.71007554E12, 147.52631578947367]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007548E12, 106.14285714285715], [1.7100756E12, 86.93333333333334], [1.71007554E12, 90.33333333333334]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007548E12, 163.0], [1.7100756E12, 130.33333333333334], [1.71007554E12, 192.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007548E12, 174.2857142857143], [1.7100756E12, 127.0], [1.71007554E12, 128.84615384615384]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007548E12, 559.2857142857143], [1.7100756E12, 550.75], [1.71007554E12, 563.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007548E12, 1266.85], [1.7100756E12, 824.0], [1.71007554E12, 829.5000000000001]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 43.413793103448256], [1.7100756E12, 40.26388888888891], [1.71007554E12, 43.34337349397592]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 177.71428571428572], [1.7100756E12, 250.2], [1.71007554E12, 205.84615384615384]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 1507.1999999999998], [1.7100756E12, 154.66666666666666], [1.71007554E12, 369.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 176.57142857142856], [1.7100756E12, 135.66666666666666], [1.71007554E12, 166.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007548E12, 70.85714285714285], [1.7100756E12, 94.0], [1.71007554E12, 71.76923076923077]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007548E12, 162.72727272727272], [1.7100756E12, 131.57142857142856], [1.71007554E12, 150.5128205128205]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007548E12, 37.375], [1.7100756E12, 59.333333333333336], [1.71007554E12, 35.85714285714286]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 81.0], [1.7100756E12, 64.66666666666667], [1.71007554E12, 62.58333333333333]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007548E12, 153.19230769230768], [1.7100756E12, 117.0909090909091], [1.71007554E12, 131.39473684210526]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007548E12, 687.6666666666666], [1.7100756E12, 774.6666666666666], [1.71007554E12, 645.6153846153845]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007548E12, 93.14285714285715], [1.7100756E12, 72.6], [1.71007554E12, 60.15384615384616]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 134.42857142857144], [1.7100756E12, 164.0], [1.71007554E12, 140.53846153846155]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 196.33333333333331], [1.7100756E12, 171.16666666666666], [1.71007554E12, 233.76923076923077]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007548E12, 91.14285714285715], [1.7100756E12, 102.2], [1.71007554E12, 78.61538461538463]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007548E12, 216.57142857142858], [1.7100756E12, 151.8], [1.71007554E12, 171.30769230769232]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007548E12, 125.5], [1.7100756E12, 85.36363636363636], [1.71007554E12, 107.80000000000001]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007548E12, 148.46153846153848], [1.7100756E12, 140.36363636363635], [1.71007554E12, 168.19230769230768]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007548E12, 87.71428571428571], [1.7100756E12, 105.7], [1.71007554E12, 81.42307692307693]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007548E12, 132.85714285714286], [1.7100756E12, 132.6], [1.71007554E12, 116.3076923076923]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007548E12, 128.42857142857144], [1.7100756E12, 122.33333333333334], [1.71007554E12, 139.16666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007548E12, 157.2142857142857], [1.7100756E12, 138.1818181818182], [1.71007554E12, 146.55999999999997]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007548E12, 170.57142857142856], [1.7100756E12, 129.0], [1.71007554E12, 172.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007548E12, 2347.1], [1.7100756E12, 895.0], [1.71007554E12, 939.9166666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007548E12, 39.375], [1.7100756E12, 37.0], [1.71007554E12, 48.35714285714286]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007548E12, 168.0], [1.7100756E12, 99.4], [1.71007554E12, 166.07692307692307]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007548E12, 183.2857142857143], [1.7100756E12, 151.2], [1.71007554E12, 130.38461538461533]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 98.78571428571428], [1.7100756E12, 110.0], [1.71007554E12, 86.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007548E12, 763.909090909091], [1.7100756E12, 261.0], [1.71007554E12, 339.6666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 164.14285714285714], [1.7100756E12, 132.6], [1.71007554E12, 134.38461538461536]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007548E12, 254.16666666666666], [1.7100756E12, 221.0], [1.71007554E12, 262.46153846153845]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7100756E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.71007548E12, "maxY": 550.0, "series": [{"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 550.0], [1.7100756E12, 246.0], [1.71007554E12, 369.84615384615387]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007548E12, 5.944444444444445], [1.7100756E12, 0.0], [1.71007554E12, 6.361702127659577]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 8.714285714285714]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007548E12, 40.5], [1.7100756E12, 0.0], [1.71007554E12, 42.85714285714285]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 65.33333333333333], [1.71007554E12, 30.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 9.461538461538463]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 29.5], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007548E12, 15.761904761904763], [1.7100756E12, 0.0], [1.71007554E12, 14.82051282051282]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007548E12, 45.42857142857143], [1.7100756E12, 0.0], [1.71007554E12, 41.92857142857143]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 3.7241379310344835], [1.7100756E12, 0.0], [1.71007554E12, 4.000000000000002]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007548E12, 12.307692307692307], [1.7100756E12, 0.0], [1.71007554E12, 3.13157894736842]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 19.666666666666668], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007548E12, 23.785714285714285], [1.7100756E12, 0.0], [1.71007554E12, 25.360000000000003]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 23.6], [1.71007554E12, 9.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007548E12, 49.42857142857143], [1.7100756E12, 0.0], [1.71007554E12, 50.53846153846154]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007548E12, 62.090909090909086], [1.7100756E12, 0.0], [1.71007554E12, 21.75]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007548E12, 0.0], [1.7100756E12, 0.0], [1.71007554E12, 9.076923076923077]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7100756E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 30.0, "minX": 1.71007548E12, "maxY": 7474.0, "series": [{"data": [[1.71007548E12, 7474.0], [1.7100756E12, 5116.0], [1.71007554E12, 5477.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71007548E12, 31.0], [1.7100756E12, 33.0], [1.71007554E12, 30.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71007548E12, 536.0], [1.7100756E12, 227.10000000000002], [1.71007554E12, 324.40000000000055]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71007548E12, 5466.800000000014], [1.7100756E12, 1597.7200000000253], [1.71007554E12, 3709.360000000008]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71007548E12, 121.0], [1.7100756E12, 113.0], [1.71007554E12, 112.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.71007548E12, 1278.0], [1.7100756E12, 498.7499999999998], [1.71007554E12, 642.2499999999998]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7100756E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 54.0, "minX": 1.0, "maxY": 1331.5, "series": [{"data": [[2.0, 1331.5], [32.0, 120.0], [34.0, 108.5], [35.0, 113.0], [37.0, 93.0], [36.0, 99.5], [39.0, 117.0], [38.0, 94.5], [41.0, 97.0], [42.0, 96.5], [45.0, 117.5], [3.0, 348.0], [5.0, 919.0], [6.0, 167.0], [7.0, 895.0], [8.0, 149.5], [10.0, 121.0], [11.0, 99.0], [12.0, 112.0], [13.0, 115.0], [14.0, 117.0], [15.0, 123.0], [1.0, 591.0], [16.0, 122.5], [17.0, 128.5], [18.0, 111.0], [19.0, 118.0], [20.0, 126.0], [21.0, 109.5], [22.0, 165.0], [23.0, 113.0], [24.0, 109.0], [25.0, 119.5], [26.0, 125.0], [27.0, 110.5], [28.0, 113.0], [29.0, 99.0], [30.0, 104.0], [31.0, 104.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[37.0, 144.0], [36.0, 92.0], [39.0, 121.0], [42.0, 57.5], [45.0, 116.0], [12.0, 122.0], [13.0, 92.0], [15.0, 134.0], [17.0, 59.0], [18.0, 124.0], [19.0, 139.0], [20.0, 369.0], [21.0, 60.5], [23.0, 165.5], [24.0, 54.0], [25.0, 139.5], [26.0, 57.0], [27.0, 55.0], [28.0, 131.5], [30.0, 124.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 45.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 54.0, "minX": 1.0, "maxY": 1328.0, "series": [{"data": [[2.0, 1328.0], [32.0, 115.5], [34.0, 106.5], [35.0, 113.0], [37.0, 91.0], [36.0, 98.0], [39.0, 117.0], [38.0, 90.0], [41.0, 87.0], [42.0, 95.5], [45.0, 115.5], [3.0, 345.0], [5.0, 919.0], [6.0, 167.0], [7.0, 895.0], [8.0, 145.0], [10.0, 119.0], [11.0, 99.0], [12.0, 112.0], [13.0, 113.0], [14.0, 117.0], [15.0, 122.0], [1.0, 591.0], [16.0, 122.5], [17.0, 128.5], [18.0, 111.0], [19.0, 118.0], [20.0, 125.0], [21.0, 109.0], [22.0, 164.5], [23.0, 113.0], [24.0, 109.0], [25.0, 113.5], [26.0, 125.0], [27.0, 110.5], [28.0, 112.0], [29.0, 94.0], [30.0, 104.0], [31.0, 104.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[37.0, 144.0], [36.0, 92.0], [39.0, 121.0], [42.0, 57.5], [45.0, 116.0], [12.0, 122.0], [13.0, 92.0], [15.0, 134.0], [17.0, 59.0], [18.0, 124.0], [19.0, 138.0], [20.0, 369.0], [21.0, 60.5], [23.0, 165.5], [24.0, 54.0], [25.0, 139.5], [26.0, 57.0], [27.0, 55.0], [28.0, 131.5], [30.0, 124.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 45.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 8.333333333333334, "minX": 1.71007548E12, "maxY": 23.25, "series": [{"data": [[1.71007548E12, 13.416666666666666], [1.7100756E12, 8.333333333333334], [1.71007554E12, 23.25]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7100756E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.71007548E12, "maxY": 22.633333333333333, "series": [{"data": [[1.71007548E12, 12.983333333333333], [1.7100756E12, 8.133333333333333], [1.71007554E12, 22.633333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "500", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7100756E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.71007548E12, "maxY": 2.7666666666666666, "series": [{"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-success", "isController": false}, {"data": [[1.71007548E12, 0.15], [1.7100756E12, 0.05], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.71007548E12, 0.1], [1.7100756E12, 0.1], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-success", "isController": false}, {"data": [[1.71007548E12, 0.16666666666666666], [1.7100756E12, 0.05], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007548E12, 0.15], [1.7100756E12, 0.05], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-success", "isController": false}, {"data": [[1.71007548E12, 0.43333333333333335], [1.7100756E12, 0.18333333333333332], [1.71007554E12, 0.6333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-success", "isController": false}, {"data": [[1.71007548E12, 0.35], [1.7100756E12, 0.25], [1.71007554E12, 0.65]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-success", "isController": false}, {"data": [[1.71007548E12, 0.13333333333333333], [1.7100756E12, 0.05], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.71007548E12, 0.18333333333333332], [1.7100756E12, 0.03333333333333333], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-success", "isController": false}, {"data": [[1.71007548E12, 1.45], [1.7100756E12, 1.2], [1.71007554E12, 2.7666666666666666]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007548E12, 0.23333333333333334], [1.7100756E12, 0.16666666666666666], [1.71007554E12, 0.43333333333333335]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007548E12, 0.21666666666666667], [1.7100756E12, 0.18333333333333332], [1.71007554E12, 0.43333333333333335]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.71007548E12, 0.23333333333333334], [1.7100756E12, 0.18333333333333332], [1.71007554E12, 0.4166666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007548E12, 0.1], [1.7100756E12, 0.1], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-success", "isController": false}, {"data": [[1.71007548E12, 0.15], [1.7100756E12, 0.05], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007548E12, 0.15], [1.7100756E12, 0.05], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-success", "isController": false}, {"data": [[1.71007548E12, 0.23333333333333334], [1.7100756E12, 0.15], [1.71007554E12, 0.45]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-success", "isController": false}, {"data": [[1.71007548E12, 0.35], [1.7100756E12, 0.26666666666666666], [1.71007554E12, 0.6333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-success", "isController": false}, {"data": [[1.71007548E12, 0.13333333333333333], [1.7100756E12, 0.05], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.06666666666666667], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-success", "isController": false}, {"data": [[1.71007548E12, 0.23333333333333334], [1.7100756E12, 0.18333333333333332], [1.71007554E12, 0.4166666666666667]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-success", "isController": false}, {"data": [[1.71007548E12, 0.9], [1.7100756E12, 0.45], [1.71007554E12, 1.5666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-success", "isController": false}, {"data": [[1.71007548E12, 0.1], [1.7100756E12, 0.1], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.06666666666666667], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.71007548E12, 0.3333333333333333], [1.7100756E12, 0.1], [1.71007554E12, 0.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-success", "isController": false}, {"data": [[1.71007548E12, 0.13333333333333333], [1.7100756E12, 0.05], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-success", "isController": false}, {"data": [[1.71007548E12, 0.23333333333333334], [1.7100756E12, 0.16666666666666666], [1.71007554E12, 0.43333333333333335]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-success", "isController": false}, {"data": [[1.71007548E12, 0.13333333333333333], [1.7100756E12, 0.05], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007548E12, 0.13333333333333333], [1.7100756E12, 0.05], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.71007548E12, 0.1], [1.7100756E12, 0.1], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-failure", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-success", "isController": false}, {"data": [[1.71007548E12, 0.23333333333333334], [1.7100756E12, 0.16666666666666666], [1.71007554E12, 0.43333333333333335]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-failure", "isController": false}, {"data": [[1.71007548E12, 0.16666666666666666], [1.7100756E12, 0.05], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-success", "isController": false}, {"data": [[1.71007548E12, 0.1], [1.7100756E12, 0.1], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-success", "isController": false}, {"data": [[1.71007548E12, 0.13333333333333333], [1.7100756E12, 0.06666666666666667], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-success", "isController": false}, {"data": [[1.71007548E12, 0.15], [1.7100756E12, 0.05], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-success", "isController": false}, {"data": [[1.71007548E12, 0.4666666666666667], [1.7100756E12, 0.3333333333333333], [1.71007554E12, 0.8666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-failure", "isController": false}, {"data": [[1.71007548E12, 0.15], [1.7100756E12, 0.05], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-success", "isController": false}, {"data": [[1.71007548E12, 0.16666666666666666], [1.7100756E12, 0.05], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-success", "isController": false}, {"data": [[1.71007548E12, 0.16666666666666666], [1.7100756E12, 0.05], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.1], [1.71007554E12, 0.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007548E12, 0.13333333333333333], [1.7100756E12, 0.05], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-success", "isController": false}, {"data": [[1.71007548E12, 0.36666666666666664], [1.7100756E12, 0.23333333333333334], [1.71007554E12, 0.65]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-success", "isController": false}, {"data": [[1.71007548E12, 0.13333333333333333], [1.7100756E12, 0.05], [1.71007554E12, 0.23333333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-success", "isController": false}, {"data": [[1.71007548E12, 0.11666666666666667], [1.7100756E12, 0.08333333333333333], [1.71007554E12, 0.21666666666666667]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7100756E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.38333333333333336, "minX": 1.71007548E12, "maxY": 22.633333333333333, "series": [{"data": [[1.71007548E12, 12.983333333333333], [1.7100756E12, 8.133333333333333], [1.71007554E12, 22.633333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.71007548E12, 0.45], [1.7100756E12, 0.38333333333333336], [1.71007554E12, 0.8333333333333334]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7100756E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
