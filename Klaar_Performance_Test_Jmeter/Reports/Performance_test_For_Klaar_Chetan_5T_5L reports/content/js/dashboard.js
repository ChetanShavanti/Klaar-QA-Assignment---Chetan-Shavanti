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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 97.22222222222223, "KoPercent": 2.7777777777777777};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9163302752293578, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competency_types"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_classification_categories"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/stats/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.78, 500, 1500, "https://okr-stage.klaarhq.com/performance/values/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/darwinbox/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_template_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with="], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/aspiration_settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item"], "isController": false}, {"data": [0.58, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/department/details/"], "isController": false}, {"data": [0.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [0.42, 500, 1500, "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/jira_config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/nylas"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/my-org/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_ratings_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/document/settings/"], "isController": false}, {"data": [0.62, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10"], "isController": false}, {"data": [0.5, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.76, 500, 1500, "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies?type=undefined"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_pas_keys"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/opertaions/"], "isController": false}, {"data": [0.5, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/eou/"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_all_system_reports"], "isController": false}, {"data": [0.98, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-chart/"], "isController": false}, {"data": [0.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/razorpay/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/user_customfield/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/successfactor/"], "isController": false}, {"data": [0.42, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_user"], "isController": false}, {"data": [0.82, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2700, 75, 2.7777777777777777, 234.63481481481472, 30, 7474, 115.0, 353.0, 773.9999999999964, 3765.039999999979, 20.2757502027575, 130.36353287816152, 11.516945857176115], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", 25, 0, 0.0, 139.48, 105, 362, 116.0, 250.40000000000038, 359.3, 362.0, 0.2331219694143976, 2.0461916612271542, 0.12543965346419247], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", 25, 0, 0.0, 114.44, 91, 301, 106.0, 125.60000000000002, 249.9999999999999, 301.0, 0.23218664090942864, 0.5675421505823242, 0.12289566345010773], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", 25, 0, 0.0, 141.11999999999998, 108, 237, 131.0, 227.20000000000002, 234.6, 237.0, 0.2361319694350779, 0.658125625749719, 0.1450459070065078], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", 25, 0, 0.0, 131.67999999999998, 96, 240, 115.0, 219.00000000000003, 236.39999999999998, 240.0, 0.23253218245405166, 0.11603900901759803, 0.12807436611727063], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports", 25, 0, 0.0, 80.2, 72, 141, 75.0, 101.20000000000003, 131.39999999999998, 141.0, 0.2331654542063048, 0.059202166107069576, 0.1468669120733072], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/settings/", 25, 0, 0.0, 133.6, 91, 316, 112.0, 237.00000000000014, 304.0, 316.0, 0.23682315941040505, 0.18571191113921415, 0.12326830465404874], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competency_types", 50, 0, 0.0, 62.67999999999999, 47, 217, 52.5, 92.9, 114.94999999999987, 217.0, 0.4679282010968237, 0.12794911748741272, 0.2673222633219159], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", 25, 0, 0.0, 97.6, 80, 125, 95.0, 115.20000000000003, 124.4, 125.0, 0.23218017181332715, 0.12017137798931972, 0.12493288541908522], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", 50, 0, 0.0, 134.68000000000004, 70, 354, 153.5, 217.09999999999997, 251.35, 354.0, 0.46221400508435406, 0.11735902472844928, 0.2967829183036746], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", 25, 0, 0.0, 147.12, 100, 337, 118.0, 247.60000000000005, 313.59999999999997, 337.0, 0.23204871166555283, 0.10333419191356649, 0.12871451975198633], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 25, 0, 0.0, 129.84000000000003, 106, 188, 117.0, 183.20000000000002, 188.0, 188.0, 0.2367446661426718, 0.11004927840225759, 0.13247528681616302], "isController": false}, {"data": ["Test", 25, 25, 100.0, 25340.56, 20510, 38099, 23852.0, 34164.200000000004, 37083.799999999996, 38099.0, 0.1876905058634514, 130.3302564016539, 11.514006052080362], "isController": true}, {"data": ["https://review-stage.klaarhq.com/get_classification_categories", 25, 0, 0.0, 65.84, 48, 175, 52.0, 107.40000000000003, 157.59999999999997, 175.0, 0.23500437108130212, 0.06655397227888439, 0.13632089494364596], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/stats/", 175, 0, 0.0, 46.165714285714266, 30, 209, 36.0, 82.0, 101.19999999999993, 171.76000000000045, 1.4823222483863865, 0.7368183832311237, 0.7672175699656101], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 25, 0, 0.0, 157.71999999999997, 107, 284, 141.0, 234.60000000000005, 272.59999999999997, 284.0, 0.23740112243250686, 0.3322224691853343, 0.13214710916653213], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", 25, 0, 0.0, 166.11999999999998, 119, 359, 142.0, 231.4, 320.8999999999999, 359.0, 0.23212627669452182, 3.6659630338904363, 0.1271707433844011], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 25, 0, 0.0, 143.0, 101, 279, 129.0, 207.80000000000007, 263.4, 279.0, 0.23764484453274273, 0.33488428775463647, 0.1522412285287883], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/values/", 25, 0, 0.0, 542.4399999999999, 99, 3670, 319.0, 1162.6000000000022, 3111.9999999999986, 3670.0, 0.22239816388075898, 0.27017901940201583, 0.11445686754410156], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 25, 0, 0.0, 136.68, 104, 241, 120.0, 192.60000000000005, 229.89999999999998, 241.0, 0.2322837206277235, 0.09958257163629945, 0.12975223456939244], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/", 25, 0, 0.0, 243.63999999999996, 147, 463, 200.0, 423.4000000000001, 459.4, 463.0, 0.23772167546236866, 0.09866378131983074, 0.12187878868920267], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/darwinbox/", 25, 0, 0.0, 158.95999999999998, 102, 284, 139.0, 270.8, 282.2, 284.0, 0.23764710355710184, 0.10072152631228731, 0.12207263327249568], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reports", 100, 0, 0.0, 107.89000000000006, 62, 343, 75.0, 189.8, 214.89999999999998, 341.8499999999994, 0.9313328304136049, 0.3647113915975152, 0.5850389093394056], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_template_for_org", 25, 0, 0.0, 179.24, 104, 348, 126.0, 306.20000000000016, 346.8, 348.0, 0.23213705371651422, 9.297497054761132, 0.1607277061377037], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", 25, 0, 0.0, 145.99999999999997, 99, 450, 118.0, 255.4000000000001, 398.0999999999999, 450.0, 0.2378754864553698, 0.38747686660894226, 0.13334036057166238], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 25, 0, 0.0, 136.83999999999997, 104, 259, 121.0, 191.2000000000001, 246.39999999999998, 259.0, 0.23227292998364799, 0.09957794556916158, 0.1295193779498662], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/aspiration_settings/", 25, 0, 0.0, 163.68, 118, 362, 145.0, 234.4, 324.7999999999999, 362.0, 0.23677381471028355, 3.760634103953176, 0.12393629363741406], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", 25, 0, 0.0, 98.24, 82, 135, 91.0, 126.00000000000003, 135.0, 135.0, 0.2374529843091068, 0.10527700671517039, 0.12939332543406404], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/department/details/", 25, 0, 0.0, 638.64, 430, 908, 605.0, 857.6, 899.0, 908.0, 0.2360806829341996, 7.603688480325036, 0.12426512509915388], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 25, 25, 100.0, 62.80000000000001, 52, 144, 58.0, 81.80000000000007, 131.09999999999997, 144.0, 0.23750712521375641, 0.05752125688770663, 0.1498335965703971], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", 25, 0, 0.0, 1235.8800000000003, 358, 3587, 941.0, 2706.800000000003, 3566.3, 3587.0, 0.21698375225663102, 3.3575269086975768, 0.1370981325293362], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 25, 25, 100.0, 968.0399999999998, 106, 2937, 798.0, 2268.400000000001, 2817.6, 2937.0, 0.23757709376692737, 0.10765212061313896, 0.12342872449609898], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", 25, 0, 0.0, 144.84, 109, 282, 129.0, 211.60000000000005, 264.29999999999995, 282.0, 0.23734928320516474, 0.32960027413842213, 0.13814469999050602], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", 25, 0, 0.0, 4977.24, 3246, 7474, 4949.0, 6334.8, 7175.799999999999, 7474.0, 0.21935982030043522, 0.9505992087691282, 0.1184628717052155], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/nylas", 25, 0, 0.0, 149.32000000000002, 118, 315, 133.0, 246.80000000000015, 306.59999999999997, 315.0, 0.23194967619825202, 0.10034541655842348, 0.12005207850104842], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", 25, 0, 0.0, 162.68, 125, 287, 135.0, 241.80000000000004, 276.5, 287.0, 0.23233552967854054, 0.48259538244751543, 0.13499964859251137], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", 25, 0, 0.0, 40.64, 34, 83, 38.0, 45.40000000000001, 72.79999999999998, 83.0, 0.23218017181332715, 0.8275953389830508, 0.1530484530996053], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/my-org/", 75, 0, 0.0, 153.58666666666667, 116, 292, 139.0, 210.20000000000002, 239.80000000000007, 292.0, 0.6882122997302208, 2.2064462695452294, 0.35149905542861865], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_ratings_for_org", 75, 0, 0.0, 94.09333333333339, 60, 268, 75.0, 180.20000000000005, 190.0, 268.0, 0.6775557402522314, 0.2761392535142558, 0.42347233765764464], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-config/", 25, 0, 0.0, 169.32000000000002, 112, 310, 155.0, 286.4000000000001, 309.4, 310.0, 0.23764710355710184, 0.15688422070761804, 0.12230471052206317], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/document/settings/", 25, 0, 0.0, 141.2, 101, 309, 118.0, 234.6000000000001, 296.4, 309.0, 0.23678951306604532, 0.11007012521429452, 0.12440699026321524], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", 25, 0, 0.0, 560.0000000000001, 431, 755, 545.0, 680.0, 732.5, 755.0, 0.23155223355284485, 0.8592758667000102, 0.13951926572471218], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", 50, 0, 0.0, 1007.0399999999998, 441, 2779, 984.5, 1498.6, 1645.9499999999996, 2779.0, 0.4236821367137519, 3.3315318015811815, 0.22839115182225686], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 325, 0, 0.0, 53.04923076923077, 43, 232, 49.0, 55.0, 63.69999999999999, 193.44000000000005, 2.9249239519772487, 56.32478067289, 1.6138496414718217], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 25, 0, 0.0, 238.71999999999997, 155, 458, 225.0, 354.0000000000002, 448.4, 458.0, 0.2328939400996786, 25.3702012931436, 0.12645413153849738], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", 25, 0, 0.0, 798.5599999999997, 93, 6182, 285.0, 1977.000000000004, 5278.699999999998, 6182.0, 0.22080904433845608, 0.0953101539039039, 0.11902987546369899], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", 25, 0, 0.0, 170.24000000000004, 124, 294, 154.0, 248.00000000000009, 286.5, 294.0, 0.23754774709716653, 4.6839126578504775, 0.12758912197601718], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies?type=undefined", 25, 0, 0.0, 76.00000000000001, 55, 181, 59.0, 143.20000000000013, 180.1, 181.0, 0.23526754625359958, 0.06203343504733583, 0.14750172333477632], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", 75, 0, 0.0, 150.86666666666673, 104, 364, 127.0, 243.60000000000014, 290.40000000000003, 364.0, 0.6553996189943547, 1.1827914999038747, 0.3609818213992345], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 25, 0, 0.0, 46.36, 40, 111, 44.0, 48.400000000000006, 92.39999999999995, 111.0, 0.23236144287161564, 2.7415927273192, 0.15362177424226933], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_pas_keys", 25, 0, 0.0, 68.24, 59, 104, 63.0, 96.4, 101.89999999999999, 104.0, 0.23780081803481404, 0.06664925271092934, 0.14026532626272234], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/opertaions/", 75, 0, 0.0, 137.6266666666667, 94, 354, 117.0, 204.20000000000007, 242.8000000000001, 354.0, 0.5806077027288562, 1.3075013305593186, 0.30277784497774335], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", 25, 0, 0.0, 676.5200000000001, 533, 1121, 644.0, 866.4000000000003, 1071.8, 1121.0, 0.23079550594990814, 0.4032159767035016, 0.14357103250985498], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 25, 0, 0.0, 71.92000000000002, 52, 233, 56.0, 112.00000000000004, 200.29999999999993, 233.0, 0.23559790035151207, 0.062120540131746345, 0.15967279574604432], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 25, 0, 0.0, 143.56000000000003, 99, 343, 126.0, 230.80000000000035, 338.5, 343.0, 0.23302418791070514, 0.08897700925106027, 0.1294831669152258], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/eou/", 25, 0, 0.0, 209.95999999999998, 137, 380, 175.0, 350.0, 371.9, 380.0, 0.23832902752223611, 0.48829521459145636, 0.12102645928863551], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_all_system_reports", 25, 0, 0.0, 86.84, 64, 159, 77.0, 128.60000000000002, 150.59999999999997, 159.0, 0.2329916123019571, 0.09920345992544269, 0.16769025221342032], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", 25, 0, 0.0, 189.75999999999996, 131, 526, 158.0, 285.00000000000034, 481.5999999999999, 526.0, 0.23728845734028114, 5.658541835734693, 0.13556030033600044], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 50, 0, 0.0, 119.72000000000001, 76, 279, 95.0, 225.8, 254.84999999999994, 279.0, 0.45690474449886687, 7.990478676255574, 0.3038595029333285], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", 50, 0, 0.0, 156.95999999999998, 107, 400, 136.5, 223.5, 285.5999999999997, 400.0, 0.45278371427536496, 0.7300253049498315, 0.28475850780599127], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_org", 50, 0, 0.0, 90.12, 66, 199, 77.0, 132.9, 177.0, 199.0, 0.4670060243777145, 2.008034692710036, 0.28731815952925793], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-chart/", 25, 0, 0.0, 124.24, 97, 248, 109.0, 208.4000000000001, 242.6, 248.0, 0.2359002425054493, 0.13039017310359793, 0.12117531988072883], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 25, 25, 100.0, 132.15999999999997, 114, 184, 124.0, 159.20000000000002, 178.0, 184.0, 0.23756354824915665, 0.11182190454696632, 0.12179771760821019], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/user_customfield/", 50, 0, 0.0, 147.7, 99, 327, 125.5, 209.29999999999998, 228.39999999999995, 327.0, 0.4665267086540705, 0.49932936785630977, 0.24283079659435503], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/successfactor/", 25, 0, 0.0, 161.44, 104, 309, 139.0, 262.0000000000001, 303.9, 309.0, 0.2376358088647662, 0.10071673930401225, 0.12299509638508407], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", 25, 0, 0.0, 1500.88, 484, 7314, 1005.0, 3956.20000000001, 7147.799999999999, 7314.0, 0.22161352374367294, 1.7426094660000533, 0.12249341253800672], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", 25, 0, 0.0, 44.120000000000005, 32, 117, 37.0, 82.4000000000001, 115.8, 117.0, 0.23246947675770172, 0.1085160252833803, 0.15323915704243032], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", 25, 0, 0.0, 153.31999999999996, 88, 255, 156.0, 241.40000000000003, 254.7, 255.0, 0.23722991374320335, 0.10517810628849056, 0.12765008053955573], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", 25, 0, 0.0, 149.72, 111, 314, 131.0, 201.20000000000007, 286.0999999999999, 314.0, 0.23584238181938247, 0.6504090686112657, 0.12828535807948832], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_user", 50, 0, 0.0, 94.70000000000003, 64, 223, 77.5, 165.39999999999998, 203.24999999999997, 223.0, 0.46694932665907096, 0.1792100443134911, 0.2964033811800743], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", 25, 0, 0.0, 520.2800000000001, 91, 2604, 268.0, 1450.0000000000005, 2290.1999999999994, 2604.0, 0.22272310173100393, 0.2884090164993274, 0.13158933256568103], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", 25, 0, 0.0, 142.36, 107, 210, 133.0, 200.40000000000003, 209.1, 210.0, 0.23623014485632482, 0.11004079989889351, 0.12342102294739628], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/", 25, 0, 0.0, 251.20000000000002, 152, 429, 250.0, 351.6, 408.29999999999995, 429.0, 0.23773976054851317, 0.6746794376503704, 0.12049505441863119], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 25, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["500/Internal Server Error", 25, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["404/Not Found", 25, 33.333333333333336, 0.9259259259259259], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2700, 75, "400/Bad Request", 25, "500/Internal Server Error", 25, "404/Not Found", 25, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 25, 25, "500/Internal Server Error", 25, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 25, 25, "404/Not Found", 25, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 25, 25, "400/Bad Request", 25, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
