from langchain.agents import Tool
import pandas as pd


def analyze_total_claims(file_path):
    df = pd.read_csv(file_path)
    total = df["Total_Claimed"].sum()
    return f"Total claimed amount is ${total:,.2f}"

def denied_percentage(file_path):
    df = pd.read_csv(file_path)
    denied = df[df["Claim_Status"] == "Denied"]
    pct = (len(denied) / len(df)) * 100
    return f"{pct:.2f}% of claims were denied."

def high_cost_providers(file_path):
    df = pd.read_csv(file_path)
    threshold = df["Total_Claimed"].quantile(0.9)
    high_cost = df[df["Total_Claimed"] > threshold]
    summary = high_cost["Provider"].value_counts().head(5)
    return f"Top high-cost providers:\n{summary.to_string()}"

def tool_list(file_path):
    return [
        Tool.from_function(
            func=lambda q: analyze_total_claims(file_path),
            name="TotalClaims",
            description="Calculates total claimed amount"
        ),
        Tool.from_function(
            func=lambda q: denied_percentage(file_path),
            name="DeniedClaims",
            description="Calculates % of denied claims"
        ),
        Tool.from_function(
            func=lambda q: high_cost_providers(file_path),
            name="HighCostHospitals",
            description="Identifies top high-cost hospitals"
        )
    ]
