# Metrics glossary

- CTR = Clicks / Impressions
- Install CVR = Installs / Clicks
- CPI / eCPI = Cost / Installs
- ROAS = Revenue / Cost
- ROI = (Revenue - Cost) / Cost
- ARPU = Revenue / acquired users (starter implementation uses installs as acquired-user denominator)
- ARPPU = Revenue / Payers
- Retention Dn = users active on day n / cohort users

All divisions return zero when the denominator is zero. Currency normalization occurs during ingestion; production deployments should define a base currency and FX source if files contain multiple currencies.
