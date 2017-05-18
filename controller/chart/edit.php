<?php

function get_singlepage_edit_context($chart) {
    $page = array(
        'title' => $chart->getID() . ' :: '.__('Check & Describe'),
        'chartData' => $chart->loadData(),
        'chart' => $chart,
        'visualizations' => DatawrapperVisualization::all()
    );
    add_header_vars($page, 'chart');
    add_editor_nav($page, 2);
    return $page;
}

// redirects to the last edited step of the chart editor (todo)
$app->get('/chart/:id/edit', function($chartid) use ($app) {
    disable_cache($app);
    $cfg = $GLOBALS['dw_config'];

    check_chart_exists($chartid, function($chart) use ($app, $cfg) {
        $step = 'upload';
        switch ($chart->getLastEditStep()) {
            case 0:
            case 1: $step = 'upload'; break;
            case 2: $step = 'describe'; break;
            default: $step = 'visualize#tell-the-story';
        }
        // var_dump($cfg);
        if (isset($cfg['singlepage']) && $cfg['singlepage']) {
            $page = get_singlepage_edit_context($chart);
            $app->render('chart/edit.twig', $page);
            return;
        }
        $app->redirect('/'.$chart->getNamespace().'/'.$chart->getId() . '/' . $step);
    });
});


