import studentGradeImg from "../assets/studentgradeproject.jpg";
import salesDbImg from "../assets/salesdatabaseproj.png";
import sqlImg from "../assets/sqlproj.png";

export const projects = [
  {
    id: "p1",
    title: "Student Grades Dashboard",
    subtitle: "PivotTables, formulas & visual summary",
    summary: "Analyzed student performance using formulas and PivotTables and built charts to show trends and outliers.",
    tags: ["Excel", "PivotTables"],
    image: studentGradeImg
  },
  {
    id: "p2",
    title: "Sales Database",
    subtitle: "Access + Excel reporting",
    summary: "Created relational tables in MS Access and generated monthly sales summaries and reports.",
    tags: ["Access", "Reporting"],
    image: salesDbImg
  },
  {
    id: "p3",
    title: "SQL Data Exploration",
    subtitle: "Practice queries & joins",
    summary: "Performed SELECT, JOIN and GROUP BY queries to extract insights from sample datasets.",
    tags: ["SQL", "Queries"],
    image: sqlImg
  }
];
