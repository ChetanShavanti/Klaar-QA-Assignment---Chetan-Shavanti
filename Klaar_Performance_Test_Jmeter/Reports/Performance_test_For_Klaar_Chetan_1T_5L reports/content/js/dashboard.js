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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9422018348623853, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [0.9, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competency_types"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_classification_categories"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/stats/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/values/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/darwinbox/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_template_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with="], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/aspiration_settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item"], "isController": false}, {"data": [0.8, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/department/details/"], "isController": false}, {"data": [0.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/jira_config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/nylas"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/my-org/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_ratings_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/document/settings/"], "isController": false}, {"data": [0.8, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10"], "isController": false}, {"data": [0.95, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies?type=undefined"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_pas_keys"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/opertaions/"], "isController": false}, {"data": [0.5, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/eou/"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_all_system_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-chart/"], "isController": false}, {"data": [0.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/razorpay/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/user_customfield/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/successfactor/"], "isController": false}, {"data": [0.9, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_user"], "isController": false}, {"data": [0.9, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 540, 15, 2.7777777777777777, 153.35740740740746, 32, 3751, 104.5, 201.7000000000001, 443.6999999999996, 2171.0600000000804, 6.503046797851586, 41.811700196747275, 3.6938331321202345], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", 5, 0, 0.0, 111.2, 104, 129, 106.0, 129.0, 129.0, 129.0, 0.0762206740956417, 0.6690150573941676, 0.04101327287763533], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", 5, 0, 0.0, 96.0, 93, 99, 97.0, 99.0, 99.0, 99.0, 0.07615334237019664, 0.18614435151621306, 0.04030772613735017], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", 5, 0, 0.0, 127.4, 120, 131, 129.0, 131.0, 131.0, 131.0, 0.07603521951367873, 0.21191847313675694, 0.04670522761142962], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", 5, 0, 0.0, 227.6, 101, 676, 127.0, 676.0, 676.0, 676.0, 0.07617538620920808, 0.03801330307900911, 0.04195597443554038], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports", 5, 0, 0.0, 76.8, 73, 81, 77.0, 81.0, 81.0, 81.0, 0.07622299800295744, 0.01935349558668842, 0.04801155635928473], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/settings/", 5, 0, 0.0, 106.6, 98, 123, 105.0, 123.0, 123.0, 123.0, 0.07599592661833326, 0.0595944619868375, 0.039556473523019164], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competency_types", 10, 0, 0.0, 54.099999999999994, 51, 64, 52.5, 63.5, 64.0, 64.0, 0.15162312555911026, 0.041459448395069216, 0.08662063325398389], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", 5, 0, 0.0, 87.4, 83, 90, 89.0, 90.0, 90.0, 90.0, 0.07616494280012795, 0.03942130828522247, 0.04098328465124072], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", 10, 0, 0.0, 144.3, 72, 274, 150.0, 267.0, 274.0, 274.0, 0.15062963186117972, 0.03824580496475266, 0.0967177567858649], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", 5, 0, 0.0, 112.8, 94, 121, 118.0, 121.0, 121.0, 121.0, 0.07607918321388903, 0.03387901127493495, 0.04220017193895406], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 5, 0, 0.0, 109.4, 102, 123, 109.0, 123.0, 123.0, 123.0, 0.07601325671197057, 0.035334287299705065, 0.04253476181246009], "isController": false}, {"data": ["Test", 5, 5, 100.0, 16562.6, 15850, 17378, 16553.0, 17378.0, 17378.0, 17378.0, 0.06017716156364337, 41.78653910236737, 3.691610288188427], "isController": true}, {"data": ["https://review-stage.klaarhq.com/get_classification_categories", 5, 0, 0.0, 52.6, 51, 56, 51.0, 56.0, 56.0, 56.0, 0.0761835108409136, 0.021575408343618107, 0.04419238812451433], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/stats/", 35, 0, 0.0, 41.85714285714285, 32, 166, 34.0, 49.599999999999994, 116.39999999999974, 166.0, 0.4587336330393069, 0.22802287032910862, 0.23743049366292254], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 5, 0, 0.0, 117.6, 105, 125, 119.0, 125.0, 125.0, 125.0, 0.07593706336188567, 0.10626739433357635, 0.04226965441042464], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", 5, 0, 0.0, 126.4, 118, 134, 126.0, 134.0, 134.0, 134.0, 0.07610234243009999, 1.2018819158003684, 0.041692787210240334], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 5, 0, 0.0, 105.0, 98, 116, 105.0, 116.0, 116.0, 116.0, 0.07612783385861539, 0.10727779712693555, 0.04876939356567548], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/values/", 5, 0, 0.0, 91.2, 86, 97, 90.0, 97.0, 97.0, 97.0, 0.07573347874161251, 0.09200434331500583, 0.03897611650081035], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 5, 0, 0.0, 109.6, 98, 119, 109.0, 119.0, 119.0, 119.0, 0.07612319778329249, 0.03263484748717324, 0.04252194251176103], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/", 5, 0, 0.0, 159.0, 147, 168, 164.0, 168.0, 168.0, 168.0, 0.07608265619769317, 0.03157727430080039, 0.03900722119510636], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/darwinbox/", 5, 0, 0.0, 136.8, 105, 186, 138.0, 186.0, 186.0, 186.0, 0.07600863458088838, 0.03221459707822809, 0.03904349784135478], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reports", 20, 0, 0.0, 95.79999999999998, 65, 174, 72.0, 168.20000000000002, 173.75, 174.0, 0.30251694094869314, 0.11846610675822847, 0.19003322486840515], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_template_for_org", 5, 0, 0.0, 205.8, 105, 324, 183.0, 324.0, 324.0, 324.0, 0.07596590650116228, 3.0425680891915707, 0.05259748799738677], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", 5, 0, 0.0, 113.8, 102, 120, 116.0, 120.0, 120.0, 120.0, 0.07611624472895005, 0.12398622676551631, 0.04266672311954818], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 5, 0, 0.0, 108.2, 97, 126, 103.0, 126.0, 126.0, 126.0, 0.07612899296568104, 0.03263733194524803, 0.042450834944730356], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/aspiration_settings/", 5, 0, 0.0, 126.4, 117, 137, 125.0, 137.0, 137.0, 137.0, 0.07596936915035857, 1.2066072459584296, 0.039765216664640814], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", 5, 0, 0.0, 95.6, 84, 122, 90.0, 122.0, 122.0, 122.0, 0.07599130659452559, 0.03369145819718224, 0.041409325273188746], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/department/details/", 5, 0, 0.0, 467.0, 423, 516, 453.0, 516.0, 516.0, 516.0, 0.07561551025346319, 2.4354249449897165, 0.03980152346349283], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 5, 5, 100.0, 83.0, 54, 123, 78.0, 123.0, 123.0, 123.0, 0.0760201909627197, 0.018411139998783674, 0.04795805015812199], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", 5, 0, 0.0, 311.0, 268, 385, 310.0, 385.0, 385.0, 385.0, 0.07551501238446202, 1.1684915734685555, 0.047713098645260674], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 5, 5, 100.0, 123.4, 95, 218, 100.0, 218.0, 218.0, 218.0, 0.07600401301188703, 0.03443931839601131, 0.03948645988508193], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", 5, 0, 0.0, 120.4, 117, 124, 120.0, 124.0, 124.0, 124.0, 0.07593937000698643, 0.1054548673339206, 0.04419908644937882], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", 5, 0, 0.0, 3445.4, 3210, 3751, 3395.0, 3751.0, 3751.0, 3751.0, 0.07216777564481908, 0.31294315524731897, 0.03897341790193842], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/nylas", 5, 0, 0.0, 120.0, 111, 134, 118.0, 134.0, 134.0, 134.0, 0.0760861294985924, 0.03291616735144183, 0.039380516244388646], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", 5, 0, 0.0, 128.6, 114, 144, 131.0, 144.0, 144.0, 144.0, 0.07620208793720948, 0.15828304789301229, 0.04427758039320278], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", 5, 0, 0.0, 37.0, 36, 39, 37.0, 39.0, 39.0, 39.0, 0.07616726331022927, 0.2714946397288446, 0.05020791282656714], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/my-org/", 15, 0, 0.0, 141.06666666666666, 115, 270, 134.0, 205.80000000000004, 270.0, 270.0, 0.2170233083033118, 0.6957885948825904, 0.11084295922132037], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_ratings_for_org", 15, 0, 0.0, 84.53333333333332, 65, 194, 71.0, 161.00000000000003, 194.0, 194.0, 0.21543676212908972, 0.08780170123229827, 0.13464797633068107], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-config/", 5, 0, 0.0, 130.6, 126, 136, 129.0, 136.0, 136.0, 136.0, 0.07608034083992696, 0.050224912507608035, 0.03915462853773585], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/document/settings/", 5, 0, 0.0, 107.6, 98, 117, 104.0, 117.0, 117.0, 117.0, 0.07601903516640567, 0.035336973378133886, 0.039939688397974855], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", 5, 0, 0.0, 503.6, 452, 578, 475.0, 578.0, 578.0, 578.0, 0.07568876778686043, 0.28087628670905235, 0.04560543918407508], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", 10, 0, 0.0, 444.4, 415, 515, 436.5, 510.20000000000005, 515.0, 515.0, 0.14828215127745073, 1.165984259849642, 0.0799333471730008], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 65, 0, 0.0, 53.36923076923077, 45, 195, 49.0, 54.4, 61.39999999999999, 195.0, 0.9138711582262463, 17.598266961975927, 0.504235551169755], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 5, 0, 0.0, 194.0, 155, 220, 192.0, 220.0, 220.0, 220.0, 0.07609423510074877, 8.289292803958423, 0.041316791714859684], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", 5, 0, 0.0, 96.0, 88, 115, 92.0, 115.0, 115.0, 115.0, 0.07562809129823182, 0.032644156595525844, 0.04076826796545309], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", 5, 0, 0.0, 131.0, 118, 150, 127.0, 150.0, 150.0, 150.0, 0.07594167679222356, 1.497400777452916, 0.040788986558323206], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies?type=undefined", 5, 0, 0.0, 60.0, 58, 63, 60.0, 63.0, 63.0, 63.0, 0.07617770735571942, 0.020085918931683832, 0.04775985168200378], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", 15, 0, 0.0, 110.93333333333334, 101, 120, 111.0, 119.4, 120.0, 120.0, 0.20511418022699301, 0.3701669971284015, 0.11297304457814851], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 5, 0, 0.0, 43.4, 42, 44, 44.0, 44.0, 44.0, 44.0, 0.07621602670609576, 0.8992597994756338, 0.0503889160937762], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_pas_keys", 5, 0, 0.0, 81.8, 60, 124, 64.0, 124.0, 124.0, 124.0, 0.07603868848470102, 0.02131162460459882, 0.04485094516089787], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/opertaions/", 15, 0, 0.0, 112.66666666666666, 100, 178, 109.0, 146.8, 178.0, 178.0, 0.18837594815893907, 0.4242138051313608, 0.09823511359069674], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", 5, 0, 0.0, 566.8, 534, 594, 565.0, 594.0, 594.0, 594.0, 0.07557550748953279, 0.13203572548708414, 0.04701327956135975], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 5, 0, 0.0, 64.6, 55, 91, 60.0, 91.0, 91.0, 91.0, 0.07616378259809894, 0.020082247364733123, 0.051618813596758475], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 5, 0, 0.0, 110.8, 107, 124, 107.0, 124.0, 124.0, 124.0, 0.07624740758814201, 0.02911400035836282, 0.04236794425552032], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/eou/", 5, 0, 0.0, 136.2, 129, 151, 131.0, 151.0, 151.0, 151.0, 0.07609423510074877, 0.15590400902477627, 0.038641603762098985], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_all_system_reports", 5, 0, 0.0, 101.8, 71, 136, 107.0, 136.0, 136.0, 136.0, 0.07624740758814201, 0.03246471651213859, 0.054877284562949866], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", 5, 0, 0.0, 143.4, 129, 160, 145.0, 160.0, 160.0, 160.0, 0.07594167679222356, 1.810956841395808, 0.04338464933930741], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 10, 0, 0.0, 122.59999999999998, 85, 226, 98.0, 223.3, 226.0, 226.0, 0.1437256564669359, 2.5135147031346565, 0.09558317583396812], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", 10, 0, 0.0, 123.59999999999998, 111, 133, 123.0, 132.9, 133.0, 133.0, 0.14181580962645715, 0.2286502946223445, 0.08918884902288908], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_org", 10, 0, 0.0, 89.6, 72, 144, 81.5, 139.9, 144.0, 144.0, 0.1521722589971848, 0.6543109925435593, 0.09362160465647112], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-chart/", 5, 0, 0.0, 107.0, 99, 115, 108.0, 115.0, 115.0, 115.0, 0.07611740348313238, 0.042072705440872, 0.03909936936731214], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 5, 5, 100.0, 117.4, 111, 124, 120.0, 124.0, 124.0, 124.0, 0.07599130659452559, 0.035769345486876304, 0.03896038668176361], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/user_customfield/", 10, 0, 0.0, 113.49999999999999, 102, 125, 115.5, 124.5, 125.0, 125.0, 0.1480889125831149, 0.15850141424911518, 0.07708143594414087], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/successfactor/", 5, 0, 0.0, 117.0, 110, 126, 116.0, 126.0, 126.0, 126.0, 0.07609076105979212, 0.03224940458979471, 0.03938291343915022], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", 5, 0, 0.0, 469.8, 435, 521, 469.0, 521.0, 521.0, 521.0, 0.07517779548632515, 0.5911441496639552, 0.04155335180201176], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", 5, 0, 0.0, 38.0, 35, 43, 37.0, 43.0, 43.0, 43.0, 0.07619628162145686, 0.035568186147516, 0.05022704110789393], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", 5, 0, 0.0, 129.6, 89, 213, 108.0, 213.0, 213.0, 213.0, 0.07596590650116228, 0.033680196827663746, 0.04087618601771525], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", 5, 0, 0.0, 120.8, 112, 131, 120.0, 131.0, 131.0, 131.0, 0.07610929294466855, 0.20989515944896875, 0.041399293134941784], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_user", 10, 0, 0.0, 80.2, 71, 92, 81.0, 91.3, 92.0, 92.0, 0.1521745746720638, 0.05840293734972761, 0.09659518900082174], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", 5, 0, 0.0, 186.4, 93, 535, 101.0, 535.0, 535.0, 535.0, 0.07512357828628093, 0.09727916485118018, 0.04438453599921871], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", 5, 0, 0.0, 130.2, 111, 180, 120.0, 180.0, 180.0, 180.0, 0.0760271264787276, 0.035414979814797916, 0.0397212037755071], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/", 5, 0, 0.0, 173.6, 153, 207, 157.0, 207.0, 207.0, 207.0, 0.07604678398150541, 0.21581245532251442, 0.038543243053126286], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 5, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["500/Internal Server Error", 5, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["404/Not Found", 5, 33.333333333333336, 0.9259259259259259], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 540, 15, "400/Bad Request", 5, "500/Internal Server Error", 5, "404/Not Found", 5, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 5, 5, "500/Internal Server Error", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 5, 5, "400/Bad Request", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
