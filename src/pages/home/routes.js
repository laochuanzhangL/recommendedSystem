import Basic from "./pages/basicInformation";
import Manage from "./pages/manageSituation";
import Relevant from "./pages/relevantIssues";
import Solve from "./pages/solveAndCost";
import Success from "./pages/successCase";
import Detail from "./pages/detailedIntroduce";
import Sign from "./pages/signContract";
import HomePage from "./pages/homePage";
import ProjectManage from "./pages/projectManage";
import Bin from "./pages/bin";

const Routes =[
    {
        path:'/home/homePage',
        component:HomePage
    },
    {
        path:'/home/projectManage',
        component:ProjectManage
    },
    {
        path:'/home/bin',
        component:Bin
    },
    {
        path:'/home/basic',
        component:Basic
    },
    {
        path:'/home/manage',
        component:Manage
    },
    {
        path:'/home/relevant',
        component:Relevant
    },
    {
        path:'/home/solve',
        component:Solve
    },
    {
        path:'/home/success',
        component:Success
    },{
        path:'/home/detail',
        component:Detail
    }
    ,{
        path:'/home/sign',
        component:Sign
    }

]

export default Routes